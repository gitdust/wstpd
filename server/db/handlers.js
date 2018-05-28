const log = require('debug')("node:db.handlers");
const Repo = require('./models').RepoAbstract;

// 首页随机获取仓库显示
exports.getRandomRepos = async (res) => {
  try {
    // TODO: 按照搜索热度随机获取
    const random = Math.random().toFixed(3);
    const result = await Repo.find({ random: { $lt: random }}).limit(10).exec();
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
exports.queryRepoDetailByName = async (q, res) => {
  try {
    const result = await Repo.findOne({ _id: q }).exec();
    res.json({ ok: true, data: result });
  } catch (error) {
    log('handler - queryRepoDetailByName error:', error);
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
