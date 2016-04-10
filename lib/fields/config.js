'use strict';

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    app.debug('command > %s: "%j"', key, val);
    return val;
  };
};
