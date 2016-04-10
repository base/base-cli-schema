'use strict';

var utils = require('./utils');

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    app.debug('command > %s: "%j"', key, val);

    if (utils.typeOf(val) === 'object') {
      return utils.stringify(val);
    }

    if (typeof val === 'string') {
      return val;
    }

    schema.omit(key);
    return;
  };
};
