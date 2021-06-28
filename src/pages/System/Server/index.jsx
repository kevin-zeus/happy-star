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
import serverApi from '../../../api/system/server';

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
    const [, res] = await serverApi.getList(params);
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
      title: '客服姓名',
      dataIndex: 'name',
    },
    {
      title: '客服类型',
      dataIndex: 'type_message',
    },
    {
      title: '所属业务组',
      dataIndex: '',
      render: (rowData) => (
        <div>
          <span>{rowData.d}</span>
          <span>{rowData.d1}</span>
          <span>{rowData.d2}</span>
        </div>
      ),
    },
    {
      title: '社交平台账号',
      dataIndex: 'account',
      render: (record) => record.map((account) => (
        <div key={account.account}>
          <span>{account.name}：</span>
          <span>{account.account}</span>
        </div>
      )),
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
        className="hide"
        schema={{
          ...filterSearchForm(props.schema, 'service_id', 'name'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="客服账号"
        columns={columns}
        rowKey="service_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Server = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [formSchema, setFormSchema] = useState(filterDrawerForm(schema, [
    'name', 'type', 'account',
  ]));

  const form = useForm();

  const editCurrentData = async ({ service_id }) => {
    const [, res] = await serverApi.edit({ service_id });
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
    const [, res] = await serverApi.create(values);
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
    console.log('更新');
    const [, res] = await serverApi.update({
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
    console.log('提交');
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
          schema={formSchema}
          data={currentData}
          onFinish={handleSubmit}
          widgets={{
            imgupload: ImageUpload,
            editor: Editor,
          }}
          watch={{
            type: (val) => {
              // eslint-disable-next-line eqeqeq
              if (val == 2) {
                setFormSchema(filterDrawerForm(schema, [
                  'name', 'type', 'account', 'd', 'd2', 'd3',
                ]));
              } else {
                setFormSchema(filterDrawerForm(schema, [
                  'name', 'type', 'account',
                ]));
              }
            },
          }}
        />
      </Drawer>
    </div>
  );
};

export default Server;
