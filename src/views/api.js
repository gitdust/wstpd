// 各个页面 api 集合
import request from '@/utils/request';

const getRandomRepos = () => request('/api');
const updateRepo = (data) => request('/api/update', {
  method: 'POST',
  data,
});

export {
  getRandomRepos,
  updateRepo,
}