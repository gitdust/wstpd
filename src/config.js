const DEV = process.env.NODE_ENV === 'development'; // 是否开发环境
const PRO = process.env.NODE_ENV === 'production'; // 是否生产环境

module.exports = {
  DEV,
  PRO,
};
