import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';

import filterSearchForm from '@/utils/filterSearchForm';
import schema from './schema.json';
import signApi from '../../../api/operator/sign';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params = {}) => {
    const [, res] = await signApi.getList(params);
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
      title: '签到记录ID',
      dataIndex: 'sign_id',
    },
    {
      title: '签到人',
      dataIndex: ['user', 'nickname'],
    },
    {
      title: '签到时间',
      dataIndex: 'create_at',
    },
  ];

  const toolbarRender = () => [];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'name'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="用户签到列表"
        columns={columns}
        rowKey="sign_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const UserSign = () => (
    <div>
      <TableProvider>
        <TableBody
          schema={schema}
        />
      </TableProvider>
    </div>
);

export default UserSign;
