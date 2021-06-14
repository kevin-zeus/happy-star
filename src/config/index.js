import devConfig from './config.dev';
import prodConfig from './config.prod';

// 测试环境
const isDev = true;
// 正式环境
// const isDev = false;

const commonConfig = {
  CODE_TYPES: {
    NO_PERMISSIONS: 'F-000-000-413',
    TOKEN_OVERDUE: 'F-000-000-403',
    SYSTEM_ERROR: 'F-000-000-500',
  },
};

// eslint-disable-next-line import/no-mutable-exports
let config = { ...commonConfig, ...devConfig };
if (!isDev) {
  config = { ...commonConfig, ...devConfig, ...prodConfig };
}

export default config;
