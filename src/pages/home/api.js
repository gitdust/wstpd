import request from '@/utils/request';

const getRandomRepos = () => request('/api');

const QueryRepoByName = (q) => {
  return request('/api/query', { params: { q } });
}

const QueryRepoDetailByName = (q) => {
  return request('/api/detail', { params: { q } });
}

export {
  getRandomRepos,
  QueryRepoByName,
  QueryRepoDetailByName
}