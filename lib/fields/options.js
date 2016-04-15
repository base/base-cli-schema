'use strict';

var debug = require('../debug');
var utils = require('../utils');

module.exports = function(app) {
  return function(val, key, config, schema) {
    debug.field(key, val);
    if (typeof val === 'undefined') {
      return;
    }

    if (typeof val === 'boolean') {
      val = config[key] = { show: val };
    }

    if (typeof val === 'string') {
      var obj = {};
      obj[val] = true;
      val = config[key] = obj;
    }

    if (!utils.isObject(val)) {
      delete config[key];
      return;
    }
    return val;
  };
};
