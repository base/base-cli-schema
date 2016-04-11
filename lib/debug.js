'use strict';

var debug = require('debug');
var field = debug('base:cli:schema:field');

module.exports = function(prop) {
  return debug('base:cli:schema:' + prop);
};

module.exports.schema = debug('base:cli:schema');
module.exports.field = function(key, val) {
  field('normalizing ' + key + ', ' + val);
};

