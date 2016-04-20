'use strict';

var utils = require('../utils');

module.exports = function(app, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'undefined') {
      delete config[key];
      return;
    }

    if (utils.isObject(val)) {
      var tasks = val;
      val = [];

      for (var key in tasks) {
        if (tasks.hasOwnProperty(key)) {
          val.push(key + ':' + tasks[key]);
        }
      }
    }

    if (typeof val === 'boolean') {
      config.run = val;
      delete config[key];
      return;
    }

    if (typeof val === 'string') {
      val = val.split(',');
    }

    val = utils.unify(val);
    config[key] = val;
    return val;
  };
};
