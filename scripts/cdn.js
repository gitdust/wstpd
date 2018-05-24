require('dotenv').config();
const path = require('path');
const fs = require('fs');
const co = require('co');
const AliOSS = require('ali-oss');
const signale = require('signale');

const BUCKET = 'packagejson';

const ossConfig = {
  region: 'oss-cn-qingdao',
  accessKeyId: process.env.ACCESSKEYID,
  accessKeySecret: process.env.ACCESSKEYSECRET,
  bucket: BUCKET,
};

const client = new AliOSS(ossConfig);

const rootDir = path.resolve('dist', 'statics');

signale.pending('start upload statics to CDN...');

// TODO: 增量资源上传
const readAndUpload = (dir) => {
  const items = fs.readdirSync(dir);
  client.useBucket(BUCKET);

  items.forEach((item) => {
    const fileOrDir = path.join(dir, item);
    const stats = fs.lstatSync(fileOrDir);
    if (stats.isDirectory()) {
      readAndUpload(fileOrDir);
    } else {
      const reg = /(\/statics\/.*)/g;
      reg.test(fileOrDir);
      co(function* upload() {
        yield client.put(`${RegExp.$1}`, fileOrDir);
        signale.success(`${fileOrDir}`);
      }).catch((err) => {
        signale.fatal(`上传cdn失败,文件:${fileOrDir},错误信息:${err}\n`);
        process.exit(1);
      });
    }
  });
};

readAndUpload(rootDir);

