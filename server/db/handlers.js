require('dotenv').config();
const log = require('debug')("node:db.handlers");
const Repo = require('./models').RepoAbstract;
const octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'oauth',
  key: process.env.CLIENTID,
  secret: process.env.CLIENTSECRET,
});

// 首页随机获取仓库显示
exports.getRandomRepos = async (res) => {
  try {
    // TODO: 按照搜索热度随机获取
    const random = Math.random().toFixed(3);
    const result = await Repo.find({ random: { $lt: random }}, { random: 0 }).limit(10).exec();
    // const result = [];
    res.json({ ok: true, data: result });
  } catch (error) {
    log('handler - getRandomRepos error:', error);
    res.json({ ok: false, message: error.message });
  }
}

// 根据名字查找，返回仓库名字列表
exports.queryRepoByName = async (q, res) => {
  try {
    const result = await Repo.find({ name: { $regex: q, $options: 'i' } }).select('name').exec();
    res.json({ ok: true, data: result });
  } catch (error) {
    log('handler - queryRepoByName error:', error);
    res.json({ ok: false, message: error.message });
  }
}

// 根据数据 _id 返回仓库详细信息
exports.queryRepoDetailByID = async (q, res) => {
  try {
    const result = await Repo.findOne({ _id: q }).exec();
    res.json({ ok: true, data: result });
  } catch (error) {
    log('handler - queryRepoDetailByID error:', error);
    res.json({ ok: false, message: error.message });
  }
}

// 新增、更新数据
exports.updateRepos = async (repo, res) => {
  try {
    const { name, ...ret } = repo;
    const exit = await Repo.findOne({ name }).exec();
    const random = Math.random();
    if (exit) {
      // 更新
      Repo.update({ name }, { $set: { random, ...ret } }).exec();
    } else {
      // 新增
      repo = new Repo({ random, ...repo });
      repo.save();
    }
    res.json({ ok: true });
  } catch (error) {
    log('handler - updateRepos error:', error);
    res.json({ ok: false, message: error.message });
  }
}

// Github API 获取 repo 信息
exports.getRepoInfor = async (payload, res) => {
  try {
    for (let i = 0; i < payload.length; i++) {
      const element = payload[i];
      const [owner, repo] = element.fullName.split('/');
      const { data: { stargazers_count, homepage, html_url } } = await octokit.repos.get({ owner, repo });
      element.star = stargazers_count;
      element.homepage = homepage;
      element.githubpage = html_url;
    }
    for (let i = 0; i < payload.length; i += 1) {
      const { fullName, ...ret } = payload[i];
      const lastUpdateTime = Date.now();
      Repo.update({ fullName }, { $set: { lastUpdateTime, ...ret } }).exec();
    }
    res.json({ data: payload });
  } catch (error) {
    log(error);
    res.json({ ok: false });
  }
}