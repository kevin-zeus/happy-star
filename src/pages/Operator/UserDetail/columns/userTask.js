export default [
  {
    title: '抢单记录ID',
    dataIndex: 'user_task_join_id',
  },
  {
    title: '返利金额',
    dataIndex: ['user_task', 'rebate'],
  },
  {
    title: '抢单时间',
    dataIndex: 'create_at',
  },
  {
    title: '结算时间',
    dataIndex: ['user_task', 'end_date'],
  },
  {
    title: '结算状态',
    dataIndex: ['user_task', 'status_message'],
  },
];
