const express = require('express');
const handlers = require('../db/handlers');

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
  const { repo } = req.body;
  handlers.updateRepos(repo, res);
});

module.exports = router;
