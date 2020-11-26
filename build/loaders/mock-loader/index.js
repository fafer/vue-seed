const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');

module.exports = function (source, sourceMap) {
  const options = getOptions(this) || {};
  validateOptions(require('./options.json'), options, 'Mock Loader');
  if (options.enable) {
    source = source.replace(/\/\/\s*@mock/g, '');
  }
  this.callback(null, source, sourceMap);
};
