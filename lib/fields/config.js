'use strict';

var debug = require('../debug');
var utils = require('../utils');

module.exports = function(app) {
  return function(obj, key, config, schema) {
    debug.field(key, obj);

    if (obj === true) {
      obj = { show: true };
    }

    if (!utils.isObject(obj)) {
      delete config[key];
      return;
    }
    return obj;
  };
};
