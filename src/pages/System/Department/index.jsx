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
import departmentApi from '../../../api/system/department';

import DepartSelect from '../../../components/DepartSelect';
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
    const [, res] = await departmentApi.getList(params);
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
      title: '部门名称',
      dataIndex: 'department_name',
    },
    {
      title: '上级部门',
      dataIndex: '',
      render: (row) => (
        <div>
          {row.pid !== '0' && <span>{row.parent?.department_name}</span>}
          {row.pid2 !== '0' && <span>/{row.parent2?.department_name}</span>}
          {row.pid === '0' && row.pid2 === '0' && <span>无</span>}
        </div>
      ),
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
        className="hide"
        schema={{
          ...filterSearchForm(props.schema, 'department_id'),
          column: 4,
        }}
        api={searchApi}
        displayType="row"
      />
      <Table
        headerTitle="部门管理"
        columns={columns}
        rowKey="department_id"
        toolbarRender={toolbarRender}
      />
    </div>
  );
});

const Department = () => {
  const tableRef = useRef();
  // state
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const form = useForm();

  const editCurrentData = async ({ department_id }) => {
    const [, res] = await departmentApi.edit({ department_id });
    if (res) {
      const data = res.result;
      if (data.start_date && data.end_date) {
        data.range_date = [data.start_date, data.end_date];
      }
      if (data.pid && data.pid2) {
        data.department = `${data.pid},${data.pid2}`;
      }
      setCurrentData(data);
      setShowDrawer(true);
      form?.setValues(data);
    }
  };

  const createRequest = async (values) => {
    const [, res] = await departmentApi.create(values);
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
    const [, res] = await departmentApi.update({
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
            'department_name', 'department',
          ], 'department_id')}
          data={currentData}
          onFinish={handleSubmit}
          widgets={{
            imgupload: ImageUpload,
            editor: Editor,
            depart: DepartSelect,
          }}
        />
      </Drawer>
    </div>
  );
};

export default Department;
