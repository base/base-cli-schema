'use strict';

var debug = require('debug');
var field = debug('base:runner:field');

module.exports.schema = debug('base:runner:schema');
module.exports.field = function(key, val) {
  field('expanding ' + key + ', ' + val);
};
