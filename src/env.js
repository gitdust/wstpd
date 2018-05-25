const DEV = process.env.NODE_ENV === 'development'; // 是否开发环境
const PRO = process.env.NODE_ENV === 'production'; // 是否生产环境
const API_HOST = DEV ? 'http://localhost:3003' : '';

module.exports = {
  DEV,
  PRO,
  API_HOST,
};
