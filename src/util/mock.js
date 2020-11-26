let Mock = require('mockjs');

const getData = (url) => {
  Mock.mock(url, {
    code: 0,
    data: {},
  });
};

module.exports = {
  getData,
};
