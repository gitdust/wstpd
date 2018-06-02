export const DEV = process.env.NODE_ENV === 'development'; // 是否开发环境
export const PRO = process.env.NODE_ENV === 'production'; // 是否生产环境
export const API_HOST = DEV ? 'http://localhost:3003' : '';
