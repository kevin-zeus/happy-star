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

import filterSearchForm from '@/utils/filterSearchForm';
import schema from './schema.json';
import partnerApi from '../../../api/business/partner';
import ImageUpload from '../../../components/ImageUpload';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params = {}) => {
    const [, res] = await partnerApi.getList(params);
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
      title: '商家ID',
      dataIndex: 'partner_id',
    },
    {
      title: '商家名称',
      dataIndex: 'partner_name',
    },
    {
      title: '商家地址',
      dataIndex: 'partner_address',
    },
    {
      title: '联系人',
      dataIndex: 'partner_contact_name',
    },
    {
      title: '联系方式',
      dataIndex: 'partner_contact',
    },
    {
      title: '添加时间',
      dataIndex: 'create_at',
    },
    {
      title: '合作状态',
      dataIndex: 'status',
      render: (record) => ({
        1: <span style={{ color: 'green' }}>合作中</span>,
        2: <span style={{ color: 'red' }}>终止合作</span>,
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
          ...filterSearchForm(props.schema, 'partner_name', 'status'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="合作商家"
        columns={columns}
        rowKey="partner_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Partner = () => {
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
    const [, res] = await partnerApi.create(values);
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
    const [, res] = await partnerApi.update({
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

  }, []);

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
          }}
        />
      </Drawer>
    </div>
  );
};

export default Partner;
