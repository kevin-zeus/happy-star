import React, {
  useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Button, Drawer, message, Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import filterSearchForm from '../../../utils/filterSearchForm';
import filterDrawerForm from '../../../utils/filterDrawerForm';
import schema from './shema.json';
import adminApi from '../../../api/system/admin';

import ImageUpload from '../../../components/ImageUpload';
import Editor from '../../../components/Editor';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params) => {
    const [, res] = await adminApi.getList(params);
    if (res && res.result) {
      return {
        rows: res.result.list,
        total: res.result.total,
      };
    }
    return null;
  };

  const columns = [
    {
      title: '账号名称',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'platform_name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '所属部门',
      dataIndex: '',
      render: (rowData) => {
        let res = '';
        if (rowData.d && rowData.d !== '0') {
          res += rowData.department.department_name;
        }
        if (rowData.d2 && rowData.d2 !== '0') {
          res += '/';
          res += rowData.department2.department_name;
        }
        if (rowData.d3 && rowData.d3 !== '0') {
          res += '/';
          res += rowData.department2.department_name;
        }
        return res;
      },
    },
    {
      title: '岗位',
      dataIndex: 'job',
    },
    {
      title: '岗位类型',
      dataIndex: 'job_type_message',
    },
    {
      title: '所属角色',
      dataIndex: 'role_name',
    },
    {
      title: '账号状态',
      dataIndex: 'active',
      render: (data) => ({
        1: <span style={{ color: 'green' }}>启用</span>,
        2: <span style={{ color: 'red' }}>禁用</span>,
      }[data]),
    },
    {
      title: '最近使用时间',
      dataIndex: 'last_time',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          {
            row.active === 1 && (
              <div>
                <Button type="link" onClick={() => props.editCurrentData(row)}>编辑</Button>
                <Button type="link" onClick={() => props.resetPassword(row)}>重置密码</Button>
                <Button
                  type="link"
                  onClick={() => props.updateActive(row, '禁用账号', '禁用帐号后，该帐号将无法登录后台。确定禁用帐号？')}
                >禁用
                </Button>
              </div>
            )
          }
          {
            row.active === 2 && (
              <Button
                type="link"
                onClick={() => props.updateActive(row, '启用账号', '启用帐号后，该帐号即可登录后台。确定启用帐号？')}
              >启用
              </Button>
            )
          }
        </div>
      ),
    },
  ];

  const toolbarRender = () => [
    <Button type="primary" icon={<PlusOutlined />} onClick={props.createItem}>添加</Button>,
  ];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'platform_id', 'name'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="内部账号管理"
        columns={columns}
        rowKey="platform_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Content = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const form = useForm();

  const editCurrentData = async ({ platform_id }) => {
    const [, res] = await adminApi.edit({ platform_id });
    if (res) {
      const data = res.result;
      if (data.start_date && data.end_date) {
        data.range_date = [data.start_date, data.end_date];
      }
      setCurrentData(data);
      setShowDrawer(true);
      form?.setValues(data);
    }
  };

  const createRequest = async (values) => {
    const [, res] = await adminApi.create(values);
    if (res) {
      message.success('添加成功');
      setShowDrawer(false);
      tableRef.current?.refresh();
    }
  };

  const createItem = () => {
    setCurrentData(null);
    setShowDrawer(true);
    form?.setValues({});
  };

  const updateRequest = async (values) => {
    const [, res] = await adminApi.update({
      ...currentData,
      ...values,
    });
    if (res) {
      message.success('修改成功');
      setShowDrawer(false);
      tableRef.current?.refresh();
    }
  };

  const handleSubmit = (values) => {
    if (currentData) {
      // 更新数据
      updateRequest(values);
    } else {
      // 新增数据
      createRequest(values);
    }
  };

  // 重置密码
  const resetPassword = ({ platform_id }) => {
    Modal.config({
      title: '重置密码',
      content: '重置密码后，该帐号的登录密码将变成123456。确定重置密码？',
      onOk: async () => {
        const [, res] = await adminApi.reset({ platform_id });
        if (res) {
          message.success('重置成功');
        }
      },
    });
  };

  // 禁用，启用
  const updateActive = async (rowData, title, content) => {
    const [, info] = await adminApi.edit({ platform_id: rowData.platform_id });
    if (info) {
      Modal.confirm({
        title,
        content,
        onOk: async () => {
          const [, res] = await adminApi.update({
            ...info.result,
            active: info.result.active === 1 ? 2 : 1,
          });
          if (res) {
            message.success('更改成功');
            tableRef?.refresh();
          }
        },
      });
    }
  };

  return (
    <div>
      <TableProvider>
        <TableBody
          ref={tableRef}
          createItem={createItem}
          editCurrentData={editCurrentData}
          schema={schema}
          updateActive={updateActive}
          resetPassword={resetPassword}
        />
      </TableProvider>
      <Drawer
        visible={showDrawer}
        placement="right"
        onClose={() => setShowDrawer(false)}
        title="编辑信息"
        width="750px"
        footer={(
          <Button type="primary" onClick={form.submit}>
            提交
          </Button>
        )}
      >
        <FormRender
          form={form}
          schema={filterDrawerForm(schema, [
            'name', 'content',
          ], 'platform_id')}
          data={currentData}
          onFinish={handleSubmit}
          widgets={{
            imgupload: ImageUpload,
            editor: Editor,
          }}
        />
      </Drawer>
    </div>
  );
};

export default Content;
