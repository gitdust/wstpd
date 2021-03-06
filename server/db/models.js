const mongoose = require('mongoose');

const { Schema } = mongoose;

// 仓库列表
const RepoSchema = new Schema({
  random: Number,
  // package 名字
  name: String,
  // 全名 owner/name，如 facebook/react
  fullName: String,
  // 作用描述
  describe: String,
  // 能否nodejs环境使用
  isNodejs: Boolean,
  // 能否浏览器使用
  isBrowser: Boolean,
  // 是否过时
  isDeprecated: Boolean,
  // 是否维护
  isNotMaintained: Boolean,
  // 是否归档
  isArchived: Boolean,
  // 是否稳定
  isStabilized: Boolean,
  homepage: String,
  githubpage: String,
  star: String,
  lastUpdateTime: Number,
}, {
  versionKey: false,
});

/**
 * 数据库中没有这个集合，数据库会自动创建这个集合存储数据，这个集合产生规则为：把Model名字字母全部变小写和在后面加复数s
 * versionKey：mongoose 会为文档增加一个 __v 字段，为 0 表示新创建
 */
exports.RepoAbstract = mongoose.model('repos', RepoSchema);
