import React from 'react';
import { Table, Search, useTable, TableProvider } from 'table-render';
import {
  Tag, Space, Menu, message, Tooltip, Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TableBody = (props) => {
  const {
    tableRowKey,
    searchSchema,
    onSearch,
    doSearch,
    afterSearch,
    searchTabs,
    columns,
  } = props;
  const { refresh, tableState } = useTable();

  const searchApi = (params) => doSearch(params);

  const apiForSearch = () => {
    if (searchTabs && searchTabs.length > 0) {
      return searchTabs.map((name) => ({
        name,
        api: searchApi,
      }));
    }
    return searchApi;
  };

  return (
    <TableProvider>
      <Search
        schema={searchSchema}
        api={apiForSearch}
        displayType="row"
        onSearch={(search) => onSearch(search)}
        afterSearch={(params) => afterSearch(params)}
      />
      <Table
        rowKey={tableRowKey}
        columns={columns}
        toolbarRender={() => [
          <Button
            key="primary"
            type="primary"
            onClick={() => alert('table-render！')}
          >
            <PlusOutlined />
            创建
          </Button>,
        ]}
        toolbarAction
      />
    </TableProvider>
  );
};

export default TableBody;
