const express = require('express');
const handlers = require('../db/handlers');

const router = express.Router();

router.get('/', (req, res) => {
  handlers.getRandomRepos(res);
});

// /api/query
router.get('/query', (req, res) => {
  const { q } = req.query;
  handlers.QueryRepoByName(q, res);
})

// /api
router.get('/detail', (req, res) => {
  const { q } = req.query;
  handlers.QueryRepoDetailByName(q, res);
});

module.exports = router;
