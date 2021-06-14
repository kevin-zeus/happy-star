import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

export default function ImageUpload({
  action,
  value,
  onChange,
  uploadProps,
}) {
  const [loading, setLoading] = useState(false);

  const props = {
    name: 'file',
    type: 'file',
    action, // 旧的兼容
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        onChange(info.file.response.url);
        setLoading(false);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
        setLoading(false);
      } else if (info.file.status === 'uploading') {
        setLoading(true);
      }
    },
    onRemove() {
      onChange('');
    },
    ...uploadProps,
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="fr-upload-mod">
      <Upload {...props} className="fr-upload-file">
        {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  );
}
