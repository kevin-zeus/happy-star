import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import departmentApi from '../../api/system/department';

const { Option } = Select;

function valToArr(val) {
  if (val.indexOf(',') > -1) {
    return val.split(',');
  }
  return [0, 0];
}

function arrToVal(arr) {
  return arr.join(',');
}

const DepartSelect = ({
  value = '',
  onChange,
}) => {
  const [depart, setDepart] = useState([]);
  const [secondDepart, setSecondDepart] = useState([]);

  const [localValue, setLocalValue] = useState(valToArr(value));

  const getDepart = async (params = {}) => {
    const [, res] = await departmentApi.getAll(params);
    if (res && Array.isArray(res.result)) {
      return res.result;
    }
    return [];
  };

  console.log('value', value);

  useEffect(() => {
    console.log('获取部门信息');
    (async () => {
      const depart1 = await getDepart();
      setDepart(depart1);
    })();
  }, []);

  const handleDepartChange = async (val) => {
    const depart2 = await getDepart({ pid: val });
    setSecondDepart(depart2);
    setLocalValue([value || 0, 0]);
    onChange(arrToVal([value || 0, 0]));
  };

  const handleDepart2Change = (val) => {
    setLocalValue([localValue[0], val || 0]);
    onChange(arrToVal([localValue[0], val || 0]));
  };

  return (
    <div>
      <Select allowClear style={{ width: 180 }} onChange={handleDepartChange} placeholder="一级部门">
        {
          depart.map((item) => (
            <Option key={item.department_id}>{item.department_name}</Option>
          ))
        }
      </Select>
      <Select allowClear style={{ width: 180 }} onChange={handleDepart2Change} placeholder="二级部门">
        {
          secondDepart.map((item) => (
            <Option key={item.department_id}>{item.department_name}</Option>
          ))
        }
      </Select>
    </div>
  );
};

export default DepartSelect;
