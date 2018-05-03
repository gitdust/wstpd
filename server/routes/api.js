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
  handlers.queryRepoDetailByName(q, res);
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

module.exports = router;
