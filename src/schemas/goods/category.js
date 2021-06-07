export const schema = {
  type: 'object',
  properties: {
    category: {
      title: '商品分类名',
      type: 'string',
      required: false,
      disabled: false,
      readOnly: false,
      hidden: false,
      props: {
        allowClear: false,
      },
    },
    status: {
      title: '状态',
      type: 'string',
      widget: 'select',
      required: false,
      placeholder: '全部',
      disabled: false,
      readOnly: false,
      hidden: false,
      props: {
        allowClear: true,
      },
      enum: [
        '1',
        '2',
      ],
      enumNames: [
        '正常',
        '禁用',
      ],
    },
  },
};

export default {
  schema,
};
