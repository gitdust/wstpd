const log = require('debug')("node:db.handlers");
const Repo = require('./models').RepoAbstract;

// 首页随机获取仓库显示
exports.getRandomRepos = async (res) => {
  try {
    const result = await Repo.find().exec();
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
    let data = [];
    result.forEach(r => data.push(r.name));
    res.json({ ok: true, data });
  } catch (error) {
    log('handler - queryRepoByName error:', error);
    res.json({ ok: false, message: error.message });
  }
}

// 根据仓库名字返回仓库详细信息
exports.queryRepoDetailByName = async (q, res) => {
  try {
    const result = await Repo.findOne({ name: q }).exec();
    res.json({ ok: true, data: result });
  } catch (error) {
    log('handler - queryRepoDetailByName error:', error);
    res.json({ ok: false, message: error.message });
  }
}

// 新增、更新数据
exports.updateRepos = async (repo, res) => {
  console.log({repo});
  try {
    const { name, ...ret } = repo;
    const exit = await Repo.find({ name }).exec();
    if (exit) {
      // 新增
      repo = new Repo(repo);
      repo.save();
    } else {
      // 更新
      Repo.update({ name }, { $set: { ...ret } }).exec();
    }
  } catch (error) {
    log('handler - updateRepos error:', error);
    res.json({ ok: false, message: error.message });
  }
}
