import React, {
  useState, useImperativeHandle, forwardRef, useRef, useEffect,
} from 'react';
import {
  Button, Drawer, message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';
import { useDispatch } from 'react-redux';
import { useDebounceFn } from 'ahooks';

import productApi from '@/api/business/product';
import filterSearchForm from '@/utils/filterSearchForm';
import { setCategory, setCategory2 } from '../../../store/goodsCategory';
import filterDrawerForm from '../../../utils/filterDrawerForm';
import schemaConfig from './schema.json';
import CategorySelect1 from '../../../components/CategorySelect/CategoryLevel1';
import CategorySelect2 from '../../../components/CategorySelect/CategoryLevel2';
import goodsCategoryApi from '../../../api/business/goods-category';
import ruleConfigApi from '../../../api/business/rule-config';

import ImageUpload from '../../../components/ImageUpload';
import Editor from '../../../components/Editor';

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
      <Search
        schema={{
          ...filterSearchForm(schemaConfig, 'product_name', 'product_category_id', 'status', 'second_category_id'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
        widgets={{
          category1: CategorySelect1,
          category2: CategorySelect2,
        }}
      />
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
  const dispatch = useDispatch();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const form = useForm();

  const calculate = async ({ price }) => {
    const [, res] = await ruleConfigApi.calculate({ price });
    if (res) {
      form?.setValues({
        ...form?.getValues(),
        rule: res.result,
      });
    }
  };

  const { run } = useDebounceFn(
    (price) => {
      calculate({ price });
    },
    { wait: 1500 },
  );

  const getCategory1 = async () => {
    const [, res] = await goodsCategoryApi.getAll({});
    if (res) {
      dispatch(setCategory(res.result || []));
    }
  };

  const getCategory2 = async ({ pid }) => {
    const [, res] = await goodsCategoryApi.getAll({ pid });
    if (res) {
      dispatch(setCategory2(res.result || []));
    }
  };

  useEffect(() => {
    getCategory1();
  }, []);

  const editCurrentData = async ({ product_id }) => {
    const [, res] = await productApi.edit({ product_id });
    if (res) {
      const data = res.result;
      if (data.start_date && data.end_date) {
        data.range_date = [data.start_date, data.end_date];
      }
      setCurrentData(data);
      setShowDrawer(true);
      form?.setValues(data);
      getCategory1();
    }
  };

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
    getCategory1();
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
          schema={filterDrawerForm(schemaConfig, [
            'product_name', 'price', 'product_image', 'image', 'status', 'product_category_id',
            'second_category_id', 'rule', 'description',
          ], 'product_id')}
          data={currentData}
          onFinish={handleSubmit}
          widgets={{
            imgupload: ImageUpload,
            editor: Editor,
            category1: CategorySelect1,
            category2: CategorySelect2,
          }}
          watch={{
            product_category_id: (val) => getCategory2({ pid: val }),
            price: (val) => {
              if (val !== currentData.price) {
                run(val);
              }
            },
          }}
        />
      </Drawer>
    </div>
  );
};

export default Product;
