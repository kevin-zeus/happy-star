import React, {
  useEffect, useState,
} from 'react';
import {
  Typography, message, Modal, Button,
} from 'antd';
import FormRender, { useForm } from 'form-render';

import signConfigApi from '../../../api/system/sign-config';

const Sign = () => {
  const form = useForm();

  const [config, setConfig] = useState(null);
  const [visible, setVisible] = useState(false);

  const getSignConfig = async () => {
    const [, res] = await signConfigApi.getList();
    if (res) {
      setConfig(res.result);
    }
  };

  useEffect(() => {
    getSignConfig();
  }, []);

  const handleSubmit = async (values) => {
    const [, res] = await signConfigApi.update(values);
    setVisible(false);
    if (res) {
      message.success('更新成功');
      getSignConfig();
    }
  };

  return (
    <div className="system_sign">
      <Typography.Title>签到奖励设置</Typography.Title>
      <Typography.Text>当前奖励金额：{config && config.price ? config.price : '-'}</Typography.Text>
      <Button type="link" onClick={() => setVisible(true)}>编辑</Button>
      <Modal
        visible={visible}
        title="签到奖励设置"
        okText="确定"
        cancelText="取消"
        onOk={() => form?.submit()}
        onCancel={() => setVisible(false)}
      >
        <FormRender
          form={form}
          schema={{
            type: 'object',
            properties: {
              price: {
                title: '连续7天签到奖励金额',
                required: false,
                disabled: false,
                readOnly: false,
                hidden: false,
                props: {
                },
                type: 'string',
              },
            },
          }}
          data={config}
          onFinish={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Sign;
