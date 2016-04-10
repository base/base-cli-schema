'use strict';

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    app.debug('command > %s: "%j"', key, val);

    if (typeof val === 'string') {
      var obj = {};
      obj[val] = true;
      val = obj;
    }

    return val;
  };
};
