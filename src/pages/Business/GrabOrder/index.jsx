import React, {
  useState, useCallback, useImperativeHandle, forwardRef, useRef,
} from 'react';
import { Button, Modal, message } from 'antd';
import {
  Table, Search, TableProvider, useTable,
} from 'table-render';
import FormRender, { useForm } from 'form-render';

import filterSearchForm from '@/utils/filterSearchForm';
import schema from './schema.json';
import grabOrderApi from '../../../api/business/grab-order';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params) => {
    const [, res] = await grabOrderApi.getList(params);
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
      dataIndex: 'user_task_id',
    },
    {
      title: '商品ID',
      dataIndex: 'product_id',
    },
    {
      title: '商品名称',
      dataIndex: 'product',
    },
    {
      title: '商品分类',
      dataIndex: 'sort',
    },
    {
      title: '原价',
      dataIndex: 'original_price',
    },
    {
      title: '优惠价',
      dataIndex: 'price',
    },
    {
      title: '抢单人数',
      dataIndex: 'number',
    },
    {
      title: '返利金额',
      dataIndex: 'rebate',
    },
    {
      title: '剩余时间',
      dataIndex: 'end_date',
    },
    {
      title: '发布人',
      dataIndex: ['user', 'nickname'],
    },
    {
      title: '发布时间',
      dataIndex: 'create_at',
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      render: (record) => ({
        1: '待支付',
        2: '待审核',
        3: '进行中',
        4: '审核失败',
        5: '抢单成功',
        6: '抢单失败',
      }[record]),
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: '300',
      render: (row) => (
        <div>
          {
            row.status === 2 && (
              <Button type="link" onClick={() => props.audit(row)}>审核</Button>
            )
          }
          {
            ![1, 2, 4].includes(row.status) && (
              <Button type="link">查看</Button>
            )
          }
          {
            row.status === 3 && (
              <Button type="link" onClick={() => props.addLog(row)}>添加抢单记录</Button>
            )
          }
        </div>
      ),
    },
  ];

  const toolbarRender = () => [
  ];

  return (
    <div>
      <Search
        schema={{
          ...filterSearchForm(schema, 'user_task_id', 'status'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="抢单任务"
        columns={columns}
        rowKey="user_task_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const GrabOrder = () => {
  const tableRef = useRef();
  // state
  const [showAudit, setShowAudit] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const formAudit = useForm();
  const formLogs = useForm();

  const handleAudit = useCallback((data) => {
    setCurrentData(data);
    setShowAudit(true);
  }, [setCurrentData]);

  const handleAddLog = useCallback((data) => {
    setCurrentData(data);
    setShowLogs(true);
  }, [setCurrentData]);

  const handleAuditSubmit = async (values) => {
    const [, res] = await grabOrderApi.audit({
      ...values,
      user_task_id: currentData.user_task_id,
    });
    if (res) {
      message.success('审核成功');
      tableRef.current?.refresh();
    }
  };

  const handleLogsSubmit = async (values) => {
    const [, res] = await grabOrderApi.batch({
      ...values,
      user_task_id: currentData.user_task_id,
    });
    if (res) {
      message.success('添加记录成功');
      tableRef.current?.refresh();
    }
  };

  return (
    <div>
      <TableProvider>
        <TableBody
          ref={tableRef}
          audit={handleAudit}
          addLog={handleAddLog}
        />
      </TableProvider>
      <Modal
        title="审核抢单任务"
        visible={showAudit}
        onOk={() => formAudit.submit()}
        onCancel={() => setShowAudit(false)}
      >
        <FormRender
          form={formAudit}
          schema={{
            type: 'object',
            properties: {
              comment: {
                title: '备注',
                required: true,
                disabled: false,
                readOnly: false,
                hidden: false,
                props: {
                  allowClear: true,
                },
                type: 'string',
              },
              status: {
                title: '状态',
                required: true,
                disabled: false,
                readOnly: false,
                hidden: false,
                enum: [
                  3,
                  4,
                ],
                props: {
                  allowClear: true,
                },
                enumNames: [
                  '通过',
                  '不通过',
                ],
                type: 'number',
                widget: 'radio',
              },
            },
            displayType: 'row',
            showDescIcon: true,
          }}
          onFinish={handleAuditSubmit}
        />
      </Modal>
      <Modal
        title="审核抢单任务"
        visible={showLogs}
        onOk={() => formLogs.submit()}
        onCancel={() => setShowLogs(false)}
      >
        <FormRender
          form={formLogs}
          schema={{
            type: 'object',
            properties: {
              number: {
                title: '抢单记录条数',
                required: true,
                disabled: false,
                readOnly: false,
                hidden: false,
                props: {
                  allowClear: true,
                },
                type: 'string',
              },
            },
            displayType: 'row',
            showDescIcon: true,
          }}
          onFinish={handleLogsSubmit}
        />
      </Modal>
    </div>
  );
};

export default GrabOrder;
