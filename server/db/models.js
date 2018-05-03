const mongoose = require('mongoose');

const { Schema } = mongoose;

// 仓库列表
const RepoSchema = new Schema({
  // 名字
  name: String,
  // github 地址
  githubPage: String,
  // 官网地址
  homepage: String,
  // 作用描述
  describe: String,
}, {
  versionKey: false
});

/**
 * 数据库中没有这个集合，数据库会自动创建这个集合存储数据，这个集合产生规则为：把Model名字字母全部变小写和在后面加复数s
 * versionKey：mongoose 会为文档增加一个 __v 字段，为 0 表示新创建
 */
exports.RepoAbstract = mongoose.model('repos', RepoSchema);
