require('dotenv').config();

const DEV = process.env.NODE_ENV === 'development'; // 是否为开发环境
const PRO = process.env.NODE_ENV === 'production'; // 是否为生成环境
const PORT = PRO ? process.env.FRONT_PORT : process.env.END_PORT;

const CORS_ERR = 'Not allowed by CORS';

module.exports = {
  DEV,
  PRO,
  CORS_ERR,
  PORT,
};
