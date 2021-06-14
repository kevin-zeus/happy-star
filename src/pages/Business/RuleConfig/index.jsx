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
import schema from '@/schemas/business/rule-config.json';
import ruleConfigApi from '../../../api/business/rule-config';

const TableBody = forwardRef((props, ref) => {
  // tableState
  const { refresh } = useTable();

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
  }));

  const searchApi = async (params = {}) => {
    const [, res] = await ruleConfigApi.getList(params);
    if (res && res.result) {
      return {
        rows: res.result,
        total: res.result.length,
      };
    }
    return null;
  };

  const columns = [
    {
      title: '返利规则ID',
      dataIndex: 'product_rule_config_id',
    },
    {
      title: '抢单人数',
      dataIndex: 'number',
    },
    {
      title: '抢单天数',
      dataIndex: 'day',
    },
    {
      title: '优惠价计算规则',
      dataIndex: 'price',
    },
    {
      title: '返利金额计算规则',
      dataIndex: 'rebate',
    },
  ];

  const toolbarRender = () => [
    <Button type="primary" icon={<PlusOutlined />} onClick={props.createItem}>添加</Button>,
  ];

  return (
    <div>
      <Search className="hide" schema={{ ...filterSearchForm(props.schema), column: 4 }} api={searchApi} displayType="row" />
      <Table
        headerTitle="返利规则"
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
    const [, res] = await ruleConfigApi.create(values);
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
    const [, res] = await ruleConfigApi.update({
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
