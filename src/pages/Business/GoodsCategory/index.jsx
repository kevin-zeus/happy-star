import React, {
  useState, useCallback, useImperativeHandle, forwardRef, useRef,
} from 'react';
import { Button, Drawer, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import goodsCategoryApi from '@/api/business/goods-category';
import filterSearchForm from '@/utils/filterSearchForm';
import schema from '@/schemas/business/goods-category.json';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params) => {
    const [, res] = await goodsCategoryApi.getList(params);
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
      title: '商品分类ID',
      dataIndex: 'product_category_id',
    },
    {
      title: '商品分类名',
      dataIndex: 'product_category_name',
    },
    {
      title: '状态',
      dataIndex: 'active',
      render: (record) => (record === 1 ? <span style={{ color: 'green' }}>正常</span> : <span style={{ color: 'red' }}>禁用</span>),
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '最近修改时间',
      dataIndex: 'update_at',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          <Button type="link" onClick={() => props.editCurrentData(row)}>编辑</Button>
          {/* <Button type="text" onClick={deleteCurrentData(row)}>删除</Button> */}
        </div>
      ),
    },
  ];

  const toolbarRender = () => [
    <Button type="primary" icon={<PlusOutlined />} onClick={props.createItem}>添加</Button>,
  ];

  return (
    <div>
      <Search schema={{ ...filterSearchForm(schema), column: 4 }} api={searchApi} displayType="row" />
      <Table
        headerTitle="商品分类"
        columns={columns}
        rowKey="product_category_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const GoodsCategory = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const form = useForm();

  const editCurrentData = useCallback((data) => {
    setCurrentData(data);
    setShowDrawer(true);
    form?.setValues(data);
  }, [setCurrentData]);

  const createRequest = async (values) => {
    const [, res] = await goodsCategoryApi.create(values);
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
    const [, res] = await goodsCategoryApi.update({
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

  return (
    <div>
      <TableProvider>
        <TableBody
          ref={tableRef}
          createItem={createItem}
          editCurrentData={editCurrentData}
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
          schema={schema}
          data={currentData}
          onFinish={handleSubmit}
        />
      </Drawer>
    </div>
  );
};

export default GoodsCategory;
