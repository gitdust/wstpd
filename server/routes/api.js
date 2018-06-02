const express = require('express');
const handlers = require('../db/handlers');
const config = require('../config');

const router = express.Router();

// /api
router.get('/', (req, res) => {
  handlers.getRandomRepos(res);
});

// /api/query
router.get('/query', (req, res) => {
  const { q } = req.query;
  handlers.queryRepoByName(q, res);
})

// /api/detail
router.get('/detail', (req, res) => {
  const { q } = req.query;
  handlers.queryRepoDetailByID(q, res);
});

// /api/update
router.post('/update', (req, res) => {
  const { token, repo } = req.body;
  if (token !== config.TOKEN) {
    res.json({ ok: false, message: '没有权限！' });
  } else {
    handlers.updateRepos(repo, res);
  }
});

// /api/worker
router.post('/worker', (req, res) => {
  const payload = req.body;
  handlers.getRepoInfor(payload, res);
})

// /api/client
// 收集客户端报错，主要是手机浏览器的问题
router.get('/client', (req, res) => {
  console.log(req.query);
  res.json({ ok: true });
});

module.exports = router;
