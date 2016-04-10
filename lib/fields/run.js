'use strict';

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    if (val === false) {
      schema.omit('tasks');
      schema.omit('_');
    }
    return val;
  };
};
