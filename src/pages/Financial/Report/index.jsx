import React, {
  useImperativeHandle, forwardRef, useRef, useEffect, useState,
} from 'react';
import {
  Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';

import filterSearchForm from '../../../utils/filterSearchForm';
import schema from './shema.json';
import reportApi from '../../../api/financial/report';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params) => {
    const [, res] = await reportApi.getList(params);
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
      title: '日期',
      dataIndex: 'day',
    },
    {
      title: '累计充值人数',
      dataIndex: 'recharge_number',
    },
    {
      title: '累计充值金额',
      dataIndex: 'recharge_price',
    },
    {
      title: '累计首次充值人数',
      dataIndex: 'first_recharge_number',
    },
    {
      title: '累计首次充值金额',
      dataIndex: 'first_recharge_price',
    },
    {
      title: '最高充值金额',
      dataIndex: 'max_recharge_price',
    },
    {
      title: '累计提现人数',
      dataIndex: 'withdrawal_number',
    },
    {
      title: '累计提现金额',
      dataIndex: 'withdrawal_price',
    },
    {
      title: '最高提现金额',
      dataIndex: 'max_withdrawal_price',
    },
    {
      title: '累计返利金额',
      dataIndex: 'return_price',
    },
  ];

  const toolbarRender = () => [
  ];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'month'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle={`${props.department}财务报表`}
        columns={columns}
        rowKey="day"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Report = () => {
  const tableRef = useRef();

  const [department, setDepartment] = useState('');

  const getPlatform = async () => {
    const [, res] = await reportApi.platform();
    if (res) {
      console.log(res);
    }
  };

  const getDepartment = async () => {
    const [, res] = await reportApi.department();
    if (res) {
      // TODO 部门字段没有返
    }
  };

  useEffect(() => {
    getPlatform();
    getDepartment();
  }, []);

  return (
    <div>

      <TableProvider>
        <TableBody
          ref={tableRef}
          schema={schema}
          department={department}
        />
      </TableProvider>
    </div>
  );
};

export default Report;
