import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';

import filterSearchForm from '@/utils/filterSearchForm';
import schema from '../../../schemas/operator/sign-reward.json';
import signRewardApi from '../../../api/operator/sign-reward';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params = {}) => {
    const [, res] = await signRewardApi.getList(params);
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
      title: '奖励记录ID',
      dataIndex: 'sign_id',
    },
    {
      title: '签到人',
      dataIndex: 'user',
    },
    {
      title: '奖励金额',
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
        headerTitle="签到奖励记录"
        columns={columns}
        rowKey="partner_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const SingReward = () => (
  <div>
    <TableProvider>
      <TableBody
        schema={schema}
      />
    </TableProvider>
  </div>
);

export default SingReward;
