import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

import './style.scss';

import uploadObj from '../../common/upload';

function getUid() {
  let idStr = Date.now().toString(36);
  idStr += Math.random().toString(36).substr(2);
  return idStr;
}

function value2FileList(value = '') {
  if (!value || Array.isArray(value)) {
    return [];
  }
  return value.split(',').map((url) => ({
    uid: getUid(),
    name: 'image',
    status: 'done',
    url,
  }));
}

function trimArr(value = []) {
  if (value.length === 0) {
    return [];
  }
  return value.filter((item) => item);
}

export default function ImageUpload({
  action,
  value = '',
  onChange,
  uploadProps,
  limit = 1, // 限制多少张，默认为1，只能选一张
}) {
  const [loading, setLoading] = useState(false);

  const props = {
    name: 'file',
    type: 'file',
    action, // 旧的兼容
    beforeUpload: async (file) => {
      try {
        setLoading(true);
        const url = await uploadObj.upload(file);
        setLoading(false);

        const urls = value.split(',');
        urls.push(url);
        onChange(trimArr(urls).join(','));
        return false;
      } catch (error) {
        message.error(error.message);
        return false;
      }
    },
    onRemove(file) {
      const urls = value.split(',');
      const fileIndex = urls.findIndex((item) => item === file.url);
      urls.splice(fileIndex, 1);
      onChange(urls.join(','));
    },
    ...uploadProps,
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const fileList = value2FileList(value);

  return (
    <div className="fr-upload-mod">
      <Upload
        {...props}
        fileList={fileList}
        listType="picture-card"
      >
        {
          fileList.length >= limit ? null : uploadButton
        }
      </Upload>
    </div>
  );
}
