'use strict';

var util = require('util');
var path = require('path');
var utils = require('../utils');

/**
 * Normalize the given `--cwd` value to be an absolute filepath.
 *
 * ```sh
 * $ --cwd=foo
 * ```
 * @name cwd
 * @api public
 */

module.exports = function(app, base, options) {
  return function(val, key, config, schema) {
    app.debug('command > %s: "%j"', key, val);

    // fix path that were mistaken as dot-notation
    if (utils.isObject(val)) {
      val = utils.stringify(val);
    }

    if (typeof val === 'string') {
      return path.resolve(val);
    }

    if (typeof val === 'boolean') {
      val = config[key] = { show: true };
      return val;
    }

    if (typeof val !== 'undefined') {
      val = util.inspect(val);
      throw new TypeError('--toc: expected a string or boolean, but received: ' + val);
    }
  };
};
