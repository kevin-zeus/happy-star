import React, { useState, useCallback } from 'react';
import { Button, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Search, TableProvider } from 'table-render';
import FormRender, { useForm } from 'form-render';

import { schema } from '../../schemas/goods/category';

import GoodsApi from '../../api/goods';

const goodsApi = new GoodsApi();

const DefaultAdmin = () => {
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const form = useForm();

  const searchApi = async () => {
    const [, res] = await goodsApi.getList();
    if (res) {
      console.log(res);
      return {
        rows: res.data,
        total: res.page.total,
      };
    }
    return null;
  };

  const toggleDrawer = useCallback(() => {
    setShowDrawer(!showDrawer);
  }, [showDrawer, setShowDrawer]);

  const editCurrentData = useCallback((data) => {
    setCurrentData(data);
    toggleDrawer();
    form?.setValues(data);
  }, [setCurrentData]);

  const columns = [
    {
      title: '商品分类名',
      dataIndex: 'category',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          <Button type="link" onClick={() => editCurrentData(row)}>编辑</Button>
          {/* <Button type="text" onClick={deleteCurrentData(row)}>删除</Button> */}
        </div>
      ),
    },
  ];

  const toolbarRender = () => [
      <Button type="primary" icon={<PlusOutlined />} onClick={toggleDrawer}>添加</Button>,
  ];

  return (
    <>
      <TableProvider>
        <Search schema={{ ...schema, column: 4 }} api={searchApi} displayType="row" />
        <Table
          headerTitle="商品分类"
          columns={columns}
          rowKey="id"
          toolbarRender={toolbarRender}
        />
      </TableProvider>
      <Drawer
        visible={showDrawer}
        placement="right"
        onClose={toggleDrawer}
        title="编辑信息"
        width="750px"
      >
        <FormRender
          form={form}
          schema={schema}
          data={currentData}
        />
      </Drawer>
    </>
  );
};

export default DefaultAdmin;
