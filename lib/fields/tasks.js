'use strict';

var utils = require('../utils');

module.exports = function(app, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'undefined') {
      delete config[key];
      return;
    }

    if (typeof val === 'boolean') {
      config.run = val;
      delete config[key];
      return;
    }

    if (typeof val === 'string') {
      return val.split(',');
    }

    val = utils.unify(val);
    return val;
  };
};
