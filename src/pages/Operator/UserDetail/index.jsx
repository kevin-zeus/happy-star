import React, { useEffect, useState } from 'react';
import {
  Descriptions, Avatar, Typography, Space, Button, Tabs,
  Modal, message,
} from 'antd';
import FormRender, { useForm } from 'form-render';
import { useParams } from 'react-router-dom';
import LogTable from './LogTable';
import userManagerApi from '../../../api/operator/user-manager';
import columns from './columns';

import './style.scss';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

const UserDetail = () => {
  const params = useParams();
  const form = useForm();

  const [userInfo, setUserInfo] = useState({});
  const [showCharge, setShowCharge] = useState(false);

  const getUserDetail = async () => {
    const [, res] = await userManagerApi.show({ user_id: params.id });
    if (res && res.result) {
      setUserInfo(res.result);
    }
  };

  const disableUser = () => {
    confirm({
      title: '禁用账号',
      content: '禁用帐号后，该帐号将无法登录快乐星球APP。确定禁用帐号？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const [, res] = await userManagerApi.disable({ user_id: params.id });
        if (res) {
          message.success('已禁用');
          getUserDetail();
        }
      },
    });
  };

  const enableUser = () => {
    confirm({
      title: '启用账号',
      content: '启用帐号后，该帐号即可登录快乐星球APP。确定启用帐号？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const [, res] = await userManagerApi.enable({ user_id: params.id });
        if (res) {
          message.success('已启用');
          getUserDetail();
        }
      },
    });
  };

  const tempCharge = (values) => {
    (async () => {
      const [, res] = await userManagerApi.tempCharge({ ...values, user_id: params.id });
      setShowCharge(false);
      if (res) {
        message.success('充值成功');
        getUserDetail();
      }
    })();
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="userDetail">
      {/* 用户基本资料 */}
      <div className="card userDetail--info">
        <div className="userinfo">
          <Avatar src="" size="large" />
          <Title level={5}>{userInfo.nickname || '-'}</Title>
        </div>
        <div className="descriptBox">
          <div className="descript">
            <Text type="secondary">UID</Text>
            <Text>{userInfo.user_id || '-'}</Text>
          </div>
          <div className="descript">
            <Text type="secondary">手机号</Text>
            <Text>{userInfo.mobile || '-'}</Text>
          </div>
          <div className="descript">
            <Text type="secondary">最近使用时间</Text>
            <Text>{userInfo.last_time || '-'}</Text>
          </div>
          <div className="descript">
            <Text type="secondary">账号状态</Text>
            <Text type={userInfo.active ? ({ 1: 'success', 2: 'danger' }[userInfo.active]) : 'secondary'}>
              {userInfo.active ? ({ 1: '正常', 2: '禁用' }[userInfo.active]) : '-'}
            </Text>
          </div>
        </div>
        {
          userInfo.active && (
            <div>
              <Space>
                { userInfo.active === 1 && <Button danger onClick={disableUser}>禁用账号</Button> }
                { userInfo.active === 2 && <Button type="primary" onClick={enableUser}>启用账号</Button> }
                <Button onClick={() => setShowCharge(true)}>临时充值</Button>
              </Space>
            </div>
          )
        }
      </div>
      {/* 用户邀请信息与账户信息 */}
      <div className="card">
        <Descriptions title="邀请信息" column={4}>
          <Descriptions.Item label="一级上线">{userInfo.parent ? userInfo.parent[0] : '无'}</Descriptions.Item>
          <Descriptions.Item label="二级上线">{userInfo.parent ? userInfo.parent[1] : '无'}</Descriptions.Item>
          <Descriptions.Item label="三级上线">{userInfo.parent ? userInfo.parent[2] : '无'}</Descriptions.Item>
          <Descriptions.Item label="邀请码">{userInfo.invite_code || '-'}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="账户信息" column={4}>
          <Descriptions.Item label="账户余额">{userInfo.wallet ? userInfo.wallet.total_price : '-'}</Descriptions.Item>
          <Descriptions.Item label="可提现金额">{userInfo.wallet ? userInfo.wallet.price : '-'}</Descriptions.Item>
          <Descriptions.Item label="冻结金额">{userInfo.wallet ? userInfo.wallet.freeze_price : '-'}</Descriptions.Item>
        </Descriptions>
      </div>
      {/* 记录 */}
      <div className="card">
        <Tabs defaultActiveKey="1">
          <TabPane tab="抢单记录" key="1">
            <LogTable columns={columns.userTask} userId={params.id} rowKey="user_task_join_id" method="taskJoin" />
          </TabPane>
          <TabPane tab="发起的抢单任务" key="2">
            <LogTable columns={columns.taskList} userId={params.id} rowKey="user_task_id" method="taskList" />
          </TabPane>
          <TabPane tab="返利记录" key="3">
            <LogTable columns={columns.rebateList} userId={params.id} rowKey="id" method="rebateList" />
          </TabPane>
          <TabPane tab="奖励记录" key="4">
            <LogTable columns={columns.reward} userId={params.id} rowKey="id" method="reward" />
          </TabPane>
          <TabPane tab="提现记录" key="5">
            <LogTable columns={columns.withdrawList} userId={params.id} rowKey="id" method="withdrawList" />
          </TabPane>
          <TabPane tab="充值记录" key="6">
            <LogTable columns={columns.recharge} userId={params.id} rowKey="user_recharge_id" method="recharge" />
          </TabPane>
          <TabPane tab="邀请记录" key="7">
            <LogTable columns={columns.inviteList} userId={params.id} rowKey="id" method="inviteList" />
          </TabPane>
          <TabPane tab="在线记录" key="8">
            <LogTable columns={columns.onlineList} userId={params.id} rowKey="id" method="onlineList" />
          </TabPane>
        </Tabs>
      </div>

      <Modal
        visible={showCharge}
        okText="确定"
        cancelText="取消"
        onOk={form.submit}
        onCancel={() => setShowCharge(false)}
        title="临时充值"
      >
        <FormRender
          form={form}
          schema={{
            type: 'object',
            properties: {
              price: {
                title: '充值金额',
                required: false,
                disabled: false,
                readOnly: false,
                hidden: false,
                props: {},
                type: 'number',
              },
            },
            displayType: 'row',
            showDescIcon: true,
          }}
          onFinish={tempCharge}
        />
        <div>临时充值的钱，将在用户完成抢单任务时被自动扣除。</div>
      </Modal>
    </div>
  );
};

export default UserDetail;
