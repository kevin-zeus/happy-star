import React, {
  useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Button,
} from 'antd';
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
    const [, res] = await reportApi.day(params);
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
      title: '图文详情ID',
      dataIndex: 'content_id',
    },
    {
      title: '图文详情名称',
      dataIndex: 'name',
    },
    {
      title: '添加人',
      dataIndex: ['platform', 'account'],
    },
    {
      title: '添加时间',
      dataIndex: 'create_at',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          <Button type="link" onClick={() => props.editCurrentData(row)}>编辑</Button>
        </div>
      ),
    },
  ];

  const toolbarRender = () => [
  ];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'content_id', 'name'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="图文详情"
        columns={columns}
        rowKey="content_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const ReportDay = () => {
  const tableRef = useRef();

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

export default ReportDay;
