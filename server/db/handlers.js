const Repo = require('./models').RepoAbstract;

// 根据名字查找，返回仓库名字列表
exports.QueryRepoByName = async (q, res) => {
  try {
    // const result = await Repo.find({ name: q }).select('name').exec();
    const result = [];
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
      data: [
        {
          repoName: 'React',
          homepage: 'https://reactjs.org/',
          githubHomepage: 'https://github.com/facebook/react',
          star: 94622,
          describe: 'UI 框架'
        }
      ],
    });  
  } catch (error) {
    console.log('error');
  }
}
