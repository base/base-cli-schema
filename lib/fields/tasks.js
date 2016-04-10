'use strict';

var utils = require('../utils');

module.exports = function(app, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'boolean') {
      return;
    }
    if (typeof val === 'undefined') {
      return;
    }
    if (typeof val === 'string') {
      return val.split(',');
    }
    if (!Array.isArray(val)) {
      return [];
    }

    val = utils.unify(val);
    var len = val.length;
    var idx = -1;
    var tasks = [];
    while (++idx < len) {
      var ele = val[idx];
      if (ele && typeof ele === 'string') {
        tasks.push(ele);
      }
    }
    val = config[key] = tasks;
    return val;
  };
};
