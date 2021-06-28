import React, {
  useEffect, useState,
} from 'react';
import {
  Typography, message, Modal, Button,
} from 'antd';
import FormRender, { useForm } from 'form-render';

import inviteConfigApi from '../../../api/system/invite-config';

const Sign = () => {
  const form = useForm();

  const [config, setConfig] = useState(null);
  const [visible, setVisible] = useState(false);

  const getSignConfig = async () => {
    const [, res] = await inviteConfigApi.getList();
    if (res) {
      setConfig(res.result);
    }
  };

  useEffect(() => {
    getSignConfig();
  }, []);

  const handleSubmit = async (values) => {
    const [, res] = await inviteConfigApi.update(values);
    setVisible(false);
    if (res) {
      message.success('更新成功');
      getSignConfig();
    }
  };

  return (
    <div className="system_sign">
      <Typography.Title>邀请奖励设置</Typography.Title>
      <div>
        <Typography.Text>邀请注册奖励：{config && config.invite ? config.invite : '-'}（元）</Typography.Text>
        <span>被邀请人完成注册后，邀请人获得的奖励金额</span>
      </div>
      <div>
        <Typography.Text>邀请首充奖励：{config && config.first_recharge ? config.first_recharge : '-'}（元）</Typography.Text>
        <span>被邀请人完成首充后，邀请人获得的奖励金额</span>
      </div>
      <Button type="link" onClick={() => setVisible(true)}>编辑</Button>
      <Modal
        visible={visible}
        title="邀请奖励设置"
        okText="确定"
        cancelText="取消"
        onOk={() => form?.submit()}
        onCancel={() => setVisible(false)}
      >
        <FormRender
          form={form}
          schema={{
            type: 'object',
            properties: {
              invite: {
                title: '邀请注册奖励',
                required: false,
                disabled: false,
                readOnly: false,
                hidden: false,
                props: {
                },
                type: 'string',
              },
              first_recharge: {
                title: '邀请首充奖励',
                required: false,
                disabled: false,
                readOnly: false,
                hidden: false,
                props: {
                },
                type: 'string',
              },
            },
          }}
          data={config}
          onFinish={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Sign;
