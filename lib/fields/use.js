'use strict';

var path = require('path');
var util = require('util');

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'undefined') {
      return;
    }
    if (typeof val === 'string') {
      val = val.split(',');
    }
    if (Array.isArray(val)) {
      val = config[key] = val.map(function(name) {
        return path.resolve(name);
      });
      return val;
    }

    val = util.inspect(val);
    throw new TypeError('--' + key + ': expected a string or boolean, but received: ' + val);
  };
};
