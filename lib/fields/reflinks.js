'use strict';

var utils = require('../utils');

module.exports = function(app, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'undefined') {
      return;
    }

    if (val === true) {
      return { show: true };
    }

    if (typeof val === 'string') {
      val = val.split(',');
    }

    val = config[key] = utils.unify(val);
    return val;
  };
};
