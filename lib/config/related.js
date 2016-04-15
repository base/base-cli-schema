'use strict';

var utils = require('../utils');

module.exports = function(app) {
  return {
    type: ['array', 'object', 'string'],
    normalize: function(val, key, config, schema) {
      if (typeof val === 'undefined') {
        return;
      }

      if (utils.isObject(val) && val.list) {
        val.list = utils.arrayify(val.list);
        return val;
      }

      var obj = {};
      obj.list = utils.arrayify(val);
      config[key] = obj;
      return obj;
    }
  };
};

