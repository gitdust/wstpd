require('dotenv').config();

// 是否为开发环境
const DEV = process.env.NODE_ENV === 'development';

// 是否为生成环境
const PRO = process.env.NODE_ENV === 'production';

// TODO: 端口由集成工具传参
const PORT = PRO ? 3002 : 3003;

// 数据库信息
const DB_DOMAIN = process.env.DB_DOMAIN;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION;

// admin token
const TOKEN = process.env.TOKEN;

const CORS_ERR = 'Not allowed by CORS';

module.exports = {
  DEV,
  PRO,
  CORS_ERR,
  PORT,
  DB_DOMAIN,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_COLLECTION,
  TOKEN,
};
