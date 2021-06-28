import React, {
  useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Button, Drawer, message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import filterSearchForm from '../../../utils/filterSearchForm';
import filterDrawerForm from '../../../utils/filterDrawerForm';
import schema from './shema.json';
import dynamicApi from '../../../api/operator/dynamic';

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
    const [, res] = await dynamicApi.getList(params);
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
    <Button type="primary" icon={<PlusOutlined />} onClick={props.createItem}>添加</Button>,
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

const Dynamic = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const form = useForm();

  const editCurrentData = async ({ content_id }) => {
    const [, res] = await dynamicApi.edit({ content_id });
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
    const [, res] = await dynamicApi.create(values);
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
    const [, res] = await dynamicApi.update({
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
          schema={filterDrawerForm(schema, [
            'name', 'content',
          ], 'content_id')}
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

export default Dynamic;
