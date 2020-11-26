import axios from 'axios';
axios.defaults.withCredentials = true;

function ajax(method, url, params) {
  return axios[method](url, params || undefined).then((response) => {
    if (response.status === 200 && response.data.code === 0)
      return response.data.data;
    throw new Error(response.data.msg || '');
  });
}

function get(url, params = {}) {
  return ajax('get', url, { params });
}

function post(url, params) {
  return ajax('post', url, params);
}

export default {
  get,
  post,
};
