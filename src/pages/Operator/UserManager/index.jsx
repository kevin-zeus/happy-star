import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import { Button } from 'antd';

import filterSearchForm from '@/utils/filterSearchForm';
import schema from './schema.json';
import userManagerApi from '../../../api/operator/user-manager';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params = {}) => {
    const [, res] = await userManagerApi.getList(params);
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
      title: 'UID',
      dataIndex: 'user_id',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: '邀请码',
      dataIndex: 'invite_code',
    },
    {
      title: '归属业务员',
      dataIndex: ['platform', 'platform_name'],
    },
    {
      title: '邀请用户数',
      dataIndex: 'invite_number',
    },
    {
      title: '注册时间',
      dataIndex: 'create_at',
    },
    {
      title: '最近使用时间',
      dataIndex: 'last_time',
    },
    {
      title: '状态',
      dataIndex: 'active',
      width: 80,
      render: (record) => ({
        1: <span style={{ color: 'green' }}>正常</span>,
        2: <span style={{ color: 'red' }}>停用</span>,
      }[record]),
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          <Button type="link" onClick={() => props.showDetail(row)}>查看</Button>
        </div>
      ),
    },
  ];

  const toolbarRender = () => [];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'user_id', 'mobile', 'invite_code'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="用户管理"
        columns={columns}
        rowKey="user_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const SingReward = () => {
  const showDetail = () => {

  };

  return (
    <div>
      <TableProvider>
        <TableBody
          schema={schema}
          showDetail={showDetail}
        />
      </TableProvider>
    </div>
  );
};

export default SingReward;
