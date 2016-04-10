'use strict';

var utils = require('../utils');
var path = require('path');

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

    if (utils.isObject(val)) {
      val = utils.stringify(val);
    }

    if (typeof val === 'string') {
      return path.resolve(val);
    }

    if (typeof val === 'boolean') {
      val = config[key] = { show: true };
    }

    return val;
  };
};
