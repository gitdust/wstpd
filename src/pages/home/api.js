import request from '@/utils/request';

const QueryRepoByName = (q) => {
  return request('/api/query', { params: { q } });
}

const QueryRepoDetailByName = (q) => {
  return request('/api/detail', { params: { q } });
}

export {
  QueryRepoByName,
  QueryRepoDetailByName
}