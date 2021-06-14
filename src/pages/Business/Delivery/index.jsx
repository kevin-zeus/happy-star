import React, {
  useState, useCallback, useImperativeHandle, forwardRef, useRef,
  useEffect,
} from 'react';
import {
  Button, Drawer, message,
} from 'antd';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import filterSearchForm from '@/utils/filterSearchForm';
import schema from '../../../schemas/business/delivery.json';
import deliveryApi from '../../../api/business/delivery';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params = {}) => {
    const [, res] = await deliveryApi.getList(params);
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
      title: '任务ID',
      dataIndex: 'partner_id',
    },
    {
      title: '商品ID',
      dataIndex: 'partner_name',
    },
    {
      title: '商品名称',
      dataIndex: 'partner_address',
    },
    {
      title: '收货人姓名',
      dataIndex: 'partner_contact_name',
    },
    {
      title: '手机号',
      dataIndex: 'partner_contact',
    },
    {
      title: '收货地址',
      dataIndex: 'create_at',
    },
    {
      title: '任务完成时间',
      dataIndex: 'create_at',
    },
    {
      title: '备注',
      dataIndex: 'create_at',
    },
    {
      title: '发货状态',
      dataIndex: 'delivery_status',
      render: (record) => ({
        1: <span>待发货</span>,
        2: <span style={{ color: 'grey' }}>无需发货</span>,
        3: <span style={{ color: 'green' }}>已发货</span>,
        4: <span style={{ color: 'red' }}>已退货</span>,
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

  const toolbarRender = () => [];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(props.schema, 'user_task_id', 'delivery_status'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="发货管理"
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
    const [, res] = await deliveryApi.create(values);
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
    const [, res] = await deliveryApi.update({
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
        />
      </Drawer>
    </div>
  );
};

export default Partner;
