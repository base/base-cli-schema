'use strict';

var utils = require('../utils');

/**
 * Register async template helpers at the given filepath.
 *
 * ```sh
 * $ --asyncHelpers="./foo.js"
 * ```
 * @name asyncHelpers
 * @api public
 * @cli public
 */

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'undefined') {
      return;
    }
    if (typeof val === 'string') {
      val = utils.stripQuotes(val);
    }
    return val;
  };
};
