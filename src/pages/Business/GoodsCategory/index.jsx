import React, {
  useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Button, Drawer, message, Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';
import { useDispatch } from 'react-redux';

import goodsCategoryApi from '@/api/business/goods-category';
import filterSearchForm from '@/utils/filterSearchForm';
import filterDrawerForm from '../../../utils/filterDrawerForm';
import { setCategory } from '../../../store/goodsCategory';
import CategorySelect from '../../../components/CategorySelect/CategoryLevel1';
import ImageUpload from '../../../components/ImageUpload';
import schemaConfig from './schema.json';

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
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '商品分类名',
      dataIndex: 'product_category_name',
    },
    {
      title: '分类图片',
      dataIndex: 'category_image',
      render: (data) => <Image src={data} width={64} height={48} />,
    },
    {
      title: '分类层级',
      dataIndex: '',
      render: (row) => (row.pid !== '0' ? '二级分类' : '一级分类'),
    },
    {
      title: '所属一级分类',
      dataIndex: '',
      render: (row) => {
        let res = '/';
        if (row.pid !== '0') {
          res = row.p_category.product_category_name;
        }
        return res;
      },
    },
    {
      title: '状态',
      dataIndex: 'active',
      render: (record) => (record === 1 ? <span style={{ color: 'green' }}>正常</span> : <span style={{ color: 'red' }}>禁用</span>),
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
      <Search
        schema={{
          ...filterSearchForm(schemaConfig, 'product_category_name', 'level', 'active'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
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
  const dispatch = useDispatch();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [schema, setSchema] = useState(filterDrawerForm(schemaConfig, [
    'product_category_name', 'level', 'category_image', 'active', 'sort',
  ], 'product_category_id'));

  const form = useForm();

  const refreshCategorySelect = async () => {
    const [, res] = await goodsCategoryApi.getAll({});
    if (res) {
      dispatch(setCategory(res.result));
    }
  };

  const editCurrentData = async ({ product_category_id }) => {
    const [, res] = await goodsCategoryApi.edit({ product_category_id });
    if (res) {
      const data = res.result;
      if (data.start_date && data.end_date) {
        data.range_date = [data.start_date, data.end_date];
      }
      setCurrentData(data);
      setShowDrawer(true);
      form?.setValues(data);
    }
  };

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
    refreshCategorySelect();
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
          widgets={{
            category: CategorySelect,
            imgupload: ImageUpload,
          }}
          watch={{
            level: (val) => {
              if (val === 2) {
                setSchema(
                  filterDrawerForm(schemaConfig, [
                    'product_category_name', 'level', 'pid', 'category_image', 'active', 'sort',
                  ], 'product_category_id'),
                );
              } else {
                setSchema(
                  filterDrawerForm(schemaConfig, [
                    'product_category_name', 'level', 'category_image', 'active', 'sort',
                  ], 'product_category_id'),
                );
              }
            },
          }}
        />
      </Drawer>
    </div>
  );
};

export default GoodsCategory;
