import { API_HOST } from '@/env';

const hasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

let serializeOriginData = {};
let isList = true;

const serializeData = (data, field) => {
  const obj = {};
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    obj[element[field]] = element;
  }
  return obj;
}

// 10天前数据就算老数据
const isOldData = (lastUpdateTime) => {
  const tenDays = 10 * 24 * 60 * 60 * 100 ;
  const diff = Date.now() - lastUpdateTime;
  if (diff > tenDays) {
    return true;
  }
  return false;
}

// ajax 工具
const request = (body) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const res = JSON.parse(xhr.responseText);
        const serializeResData = serializeData(res.data, 'fullName');

        Object.keys(serializeResData).forEach((key) => {
          Object.assign(serializeOriginData[key], serializeResData[key]);
        });

        let sendData = Object.values(serializeOriginData);
        if (isList) {
          self.postMessage(sendData);
        } else {
          self.postMessage(sendData[0]);
        }
      }
    }
  };
  xhr.open('POST', `${API_HOST}/api/worker`);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
};

self.addEventListener('message', function(event) {
  isList = true;
  let originData = event.data;
  let APIData = [];
  if (Object.prototype.toString.call(originData) === '[object Object]') {
    isList = false;
    originData = [originData];
  }
  serializeOriginData = serializeData(originData, 'fullName');
  for (let i = 0; i < originData.length; i++) {
    const element = originData[i];
    if (!hasOwnProperty(element, 'star') || isOldData(element.lastUpdateTime)) {
      APIData.push({ fullName: element.fullName });
    }
  }
  if (APIData.length) {
    request(APIData);
  }
});
