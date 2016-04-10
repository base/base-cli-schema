'use strict';

var options = require('./options');
var debug = require('../debug');
var utils = require('../utils');

module.exports = function(app, base, argv) {
  var fn = options(app, base, argv);

  return function(val, key, config, schema) {
    debug.field(key, val);

    schema.update('options', config);
    val = fn(val, key, config, schema);
    config.options = utils.merge({}, config.options, val);
    schema.omit(key);
    return;
  };
};
