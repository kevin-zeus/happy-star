import React from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';

const CategorySelect = ({
  value,
  onChange,
}) => {
  const goodsCategoryStore = useSelector((state) => state.goodsCategory);

  const handleChange = (val) => {
    onChange(val);
  };

  return (
    <Select allowClear defaultValue={value} onChange={handleChange} style={{ width: '100%' }}>
      {
        goodsCategoryStore.categoryList.map((category) => (
          <Select.Option key={category.product_category_id}>{category.product_category_name}</Select.Option>
        ))
      }
    </Select>
  );
};

export default CategorySelect;
