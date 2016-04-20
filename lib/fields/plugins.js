'use strict';

var base = require('./base-normalizer');

/**
 * Normalize plugins value.
 *
 * ```sh
 * $ --plugins="./foo.js"
 * ```
 * @name plugins
 * @api public
 * @cli public
 */

module.exports = function(app) {
  var field = base(app);

  return function(val, key, config, schema) {
    return field.normalize(val, key, config, schema);
  };
};
