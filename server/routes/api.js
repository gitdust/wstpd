const express = require('express');

const router = express.Router();

// /api
router.get('/', (req, res) => {
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
});

module.exports = router;
