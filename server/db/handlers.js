const Repo = require('./models').RepoAbstract;

// 首页随机获取仓库显示
exports.getRandomRepos = async (res) => {
  try {
    const result = [];
    for (let i = 0; i < 7; i += 1) {
      result.push({
        id: i,
        name: `React${i}`,
        homepage: 'https://reactjs.org/',
        githubPage: 'https://github.com/facebook/react',
        describe: 'UI 框架'
      });
    }
    res.json({ ok: true, data: result });
  } catch (error) {
    console.log('error');
  }
}

// 根据名字查找，返回仓库名字列表
exports.QueryRepoByName = async (q, res) => {
  try {
    // const result = await Repo.find({ name: q }).select('name').exec();
    const result = [];
    for (let i = 0; i < 10; i += 1) {
      result.push(`react-${i}`);
    }
    res.json({ ok: true, data: result });
  } catch (error) {
    console.log('error');
  }
}

// 根据仓库名字返回仓库详细信息
exports.QueryRepoDetailByName = async (q, res) => {
  try {
    // const result = await Repo.find({ name: q }).exec();
    res.json({
      ok: true,
      data:{
        name: 'React',
        homepage: 'https://reactjs.org/',
        githubPage: 'https://github.com/facebook/react',
        describe: 'UI 框架'
      },
    });
  } catch (error) {
    console.log('error');
  }
}
