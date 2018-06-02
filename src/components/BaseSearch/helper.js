// TODO: api逻辑拆分
import request from '@/utils/request';

const queryRepoByName = q => request('/api/query', { params: { q } });
const queryRepoDetailByID = q => request('/api/detail', { params: { q } });

// 函数防抖 from lodash
const debounce = function (func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  var later = function () {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

export {
  queryRepoByName,
  queryRepoDetailByID,
  debounce,
}