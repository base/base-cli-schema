'use strict';

var utils = require('../utils');

/**
 * Register async template helpers at the given filepath.
 *
 * ```sh
 * $ --helpers="./foo.js"
 * ```
 * @name helpers
 * @api public
 * @cli public
 */

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    if (typeof val === 'undefined') {
      return;
    }
    if (typeof val === 'string') {
      val = [utils.stripQuotes(val)];
    }

    config[key] = val;
    return val;
  };
};
