import React, {
  useState, useCallback, useImperativeHandle, forwardRef, useRef,
  useEffect,
} from 'react';
import {
  Button, Drawer, message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import productApi from '@/api/business/product';
import filterSearchForm from '@/utils/filterSearchForm';
import schemaConfig from '@/schemas/business/product.json';
import goodsCategoryApi from '../../../api/business/goods-category';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params) => {
    const [, res] = await productApi.getList(params);
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
      title: '商品ID',
      dataIndex: 'product_id',
    },
    {
      title: '商品名称',
      dataIndex: 'product_name',
    },
    {
      title: '商品分类',
      dataIndex: ['category', 'product_category_name'],
    },
    {
      title: '原价',
      dataIndex: 'price',
    },
    {
      title: '抢单规则',
      dataIndex: 'rule',
      render: (record) => (record.length > 0 ? record.map((rule, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>{rule.number}人抢单-优惠价￥{rule.price}-返利￥{rule.rebate}</div>
      )) : null),
    },
    {
      title: '任务数',
      dataIndex: 'total_task',
    },
    {
      title: '已完成任务数',
      dataIndex: 'complete_task',
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      render: (record) => ({
        1: <span style={{ color: 'green' }}>正常</span>,
        2: <span style={{ color: 'orange' }}>维护中</span>,
        3: <span style={{ color: 'red' }}>下架</span>,
      }[record]),
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          <Button type="link" onClick={() => props.editCurrentData(row)}>编辑</Button>
          <Button type="link">查看</Button>
        </div>
      ),
    },
  ];

  const toolbarRender = () => [
    <Button type="primary" icon={<PlusOutlined />} onClick={props.createItem}>添加</Button>,
  ];

  return (
    <div>
      <Search schema={{ ...filterSearchForm(props.schema), column: 4 }} api={searchApi} displayType="row" />
      <Table
        headerTitle="商品管理"
        columns={columns}
        rowKey="product_category_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Product = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [schema, setSchema] = useState(schemaConfig);

  const form = useForm();

  const editCurrentData = useCallback((data) => {
    setCurrentData(data);
    setShowDrawer(true);
    form?.setValues(data);
  }, [setCurrentData]);

  const createRequest = async (values) => {
    const [, res] = await productApi.create(values);
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
    const [, res] = await productApi.update({
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

  useEffect(() => {
    (async function () {
      const [, res] = await goodsCategoryApi.getAll();
      const newSchema = JSON.parse(JSON.stringify(schemaConfig));
      if (res) {
        if (newSchema.properties.product_category_id) {
          newSchema.properties.product_category_id.enum = res.result.map((category) => category.product_category_id);
          newSchema.properties.product_category_id.enumNames = res.result.map((category) => category.product_category_name);
        }
      } else {
        delete newSchema.properties.product_category_id;
      }
      setSchema(newSchema);
    }());
  }, []);

  console.log(schema);

  return (
    <div>
      <TableProvider>
        <TableBody
          ref={tableRef}
          createItem={createItem}
          editCurrentData={editCurrentData}
          schema={schema}
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
        {/* TODO:修改商品与查看 */}
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

export default Product;
