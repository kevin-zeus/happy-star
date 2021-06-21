import COS from 'cos-js-sdk-v5';
import dayjs from 'dayjs';

import systemConfigApi from '../api/system/config';

class Upload {
  constructor() {
    this.bucket = 'sexy-gz-1304380757'; // 存储桶
    this.region = 'ap-guangzhou'; // 存储桶所在地域
    this.cos = new COS({
      async getAuthorization(options, callback) {
        const [, res] = await systemConfigApi.upload();
        if (res && res.result) {
          const credentials = res.result.credentials;
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            SecurityToken: credentials.sessionToken,
            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            StartTime: res.result.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: res.result.expiredTime,
          });
        }
      },
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Upload();
    }
    return this.instance;
  }

  upload(file, onProgress) {
    return new Promise((resolve, reject) => {
      const filename = file?.name || new Date().getTime();
      const currentDate = dayjs().format('YYYY-MM-DD');
      const Key = `/${currentDate}/${filename}`;
      if (this.cos) {
        this.cos.putObject({
          Bucket: this.bucket,
          Region: this.region,
          Key,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress(progressData) {
            // eslint-disable-next-line no-unused-expressions
            typeof onProgress === 'function' && onProgress(progressData);
          },
        }, (err, data) => {
          if (err) {
            reject(err);
          }
          if (data?.statusCode === 200) {
            resolve(`https://${data.Location}`);
          } else {
            reject(new Error('上传失败'));
          }
        });
      } else {
        reject(new Error('cos对象不存在'));
      }
    });
  }
}

export default Upload.getInstance();
