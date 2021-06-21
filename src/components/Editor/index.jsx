import React, { createRef, useEffect } from 'react';
import WangEditor from 'wangeditor';

import uploadObj from '../../common/upload';

const Editor = ({
  value,
  onChange,
}) => {
  const editorRef = createRef();
  const editor = createRef();

  useEffect(() => {
    if (editorRef.current) {
      editor.current = new WangEditor(editorRef.current);
      editor.current.config.uploadImgServer = '/upload-img';
      editor.current.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif'];
      editor.current.config.onchangeTimeout = 500; // 修改为 500ms

      editor.current.create();

      editor.current.txt.html(value);
      editor.current.config.onchange = (newHtml) => {
        onChange(newHtml);
      };

      editor.current.config.customUploadImg = (resultFiles, insertImgFn) => {
        resultFiles.forEach((file) => {
          uploadObj.upload(file).then((url) => insertImgFn(url));
        });
      };

      editor.current.config.customUploadVideo = (resultFiles, insertVideoFn) => {
        resultFiles.forEach((file) => {
          uploadObj.upload(file).then((url) => {
            console.log(url);
            insertVideoFn(url);
          });
        });
      };
    }
    return () => {
      editor.current?.destory();
    };
  }, []);

  return (
    <div ref={editorRef} />
  );
};

export default Editor;
