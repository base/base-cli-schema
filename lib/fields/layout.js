'use strict';

var debug = require('../debug');
var utils = require('../utils');

module.exports = function(app) {
  return function(val, key, config, schema) {
    debug.field(key, val);
    if (typeof val === 'undefined') {
      return;
    }

    if (utils.falsey(val) || val === 'null') {
      return false;
    }

    if (val === true) {
      return 'default';
    }

    if (utils.isObject(val)) {
      val = config[key] = utils.stringify(val);
    }
    return val;
  };
};
