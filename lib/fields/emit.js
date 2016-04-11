'use strict';

var utils = require('../utils');

module.exports = function(app, base, options) {
  return function(val, key, config, next) {
    app.debug('command > %s: "%j"', key, val);
    if (typeof val === 'undefined') {
      return;
    }

    if (utils.isObject(val)) {
      val = utils.stringify(val);
    }

    if (Array.isArray(val)) {
      return val.filter(Boolean);
    }

    if (utils.isString(val)) {
      return [val];
    }

    if (val === true) {
      return ['*'];
    }
  };
};
