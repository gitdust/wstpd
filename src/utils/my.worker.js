import { API_HOST } from '@/env';

const request = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        self.postMessage({ res: JSON.parse(xhr.responseText) });
      }
    }
  };
  xhr.open('POST', `${API_HOST}/api/worker`);
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({formData: '123'}));
};

self.addEventListener('message', function(event) {
  console.log('from parent', event.data);
  request();
});
