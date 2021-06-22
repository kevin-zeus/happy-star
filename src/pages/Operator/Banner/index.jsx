import React, {
  useState, useCallback, useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Button, Drawer, message, Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import filterSearchForm from '@/utils/filterSearchForm';
import schema from './schema.json';
import bannerApi from '../../../api/operator/banner';

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
    const [, res] = await bannerApi.getList(params);
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
      title: 'ID',
      dataIndex: 'banner_id',
    },
    {
      title: '轮播图名称',
      dataIndex: 'banner_name',
    },
    {
      title: '图片',
      dataIndex: 'image',
      render: (record) => <Image src={record} width={120} height={60} />,
    },
    {
      title: '优先级',
      dataIndex: 'sort',
    },
    {
      title: '添加人',
      dataIndex: ['platform', 'platform_name'],
    },
    {
      title: '状态',
      dataIndex: 'status_message',
    },
    {
      title: '展示时间',
      dataIndex: '',
      width: 200,
      render: (rowData) => <span>{rowData.start_date} ~ {rowData.end_date}</span>,
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
          <Button type="link">下架</Button>
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
          ...filterSearchForm(props.schema, 'banner_name', 'status'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="轮播图管理"
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

  const form = useForm();

  const editCurrentData = useCallback((data) => {
    setCurrentData(data);
    setShowDrawer(true);
    form?.setValues(data);
  }, [setCurrentData]);

  const createRequest = async (values) => {
    const [, res] = await bannerApi.create(values);
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
    const [, res] = await bannerApi.update({
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
        <FormRender
          form={form}
          schema={schema}
          data={currentData}
          onFinish={handleSubmit}
          widgets={{
            imgupload: ImageUpload,
            editor: Editor,
          }}
        />
      </Drawer>
    </div>
  );
};

export default Product;
