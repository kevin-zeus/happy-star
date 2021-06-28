import React, {
  useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Modal, message,
} from 'antd';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import filterSearchForm from '../../../utils/filterSearchForm';
import schema from './shema.json';
import eargingApi from '../../../api/financial/earging';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params) => {
    const [, res] = await eargingApi.getList(params);
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
      title: '流水号',
      dataIndex: 'earning_log_id',
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      render: (record) => ({
        1: '用户充值',
        2: '参与任务',
        3: '发起任务',
        4: '退回任务款',
        5: '抢单返利',
        6: '签到奖励',
        7: '邀请注册奖励',
        8: '邀请首充奖励',
      }[record]),
    },
    {
      title: '交易金额',
      dataIndex: 'price',
    },
    {
      title: '收支后余额',
      dataIndex: 'after_price',
    },
    {
      title: '交易时间',
      dataIndex: 'create_at',
    },
  ];

  const toolbarRender = () => [
  ];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'earning_log_id', 'type'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="账户交易流水"
        columns={columns}
        rowKey="earning_log_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Earning = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);

  const form = useForm();

  // TODO: 绑定银行卡和账户信息配置

  return (
    <div>
      <TableProvider>
        <TableBody
          ref={tableRef}
          schema={schema}
        />
      </TableProvider>
    </div>
  );
};

export default Earning;
