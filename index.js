/*!
 * base-cli-schema <https://github.com/jonschlinkert/base-cli-schema>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('base:base-cli:schema');
var processArgv = require('./lib/argv');
var fields = require('./lib/fields');
var utils = require('./lib/utils');

module.exports = function(app, options) {
  debug('creating cli schema');

  if (typeof app.argv !== 'function') {
    throw new Error('expected base-argv to be registered');
  }

  var opts = utils.merge({sortArrays: false, omitEmpty: true}, options);
  var schema = new utils.Schema(opts);
  schema.app = app;

  // Configuration, settings and data
  schema
    .field('data', ['boolean', 'object', 'string'], {
      normalize: fields.data(app, opts)
    })
    .field('disable', 'string', {
      normalize: fields.disable(app, opts)
    })
    .field('enable', 'string', {
      normalize: fields.enable(app, opts)
    })
    .field('options', ['boolean', 'object', 'string'], {
      normalize: fields.options(app, opts)
    })
    .field('option', ['boolean', 'object', 'string'], {
      normalize: fields.option(app, opts)
    })

  // misc
  schema
    .field('cwd', ['boolean', 'string'], {
      normalize: fields.cwd(app, opts)
    })
    .field('emit', ['array', 'boolean', 'string'], {
      normalize: fields.emit(app, opts)
    })
    .field('pkg', ['boolean', 'object'], {
      normalize: fields.pkg(app, opts)
    })
    .field('reflinks', ['array', 'object', 'string'], {
      normalize: fields.reflinks(app, opts)
    })
    .field('related', ['array', 'object', 'string'], {
      normalize: fields.related(app, opts)
    })
    .field('save', ['object', 'string'], {
      normalize: fields.save(app, opts)
    })
    .field('tasks', ['array', 'string'], {
      normalize: fields.tasks(app, opts)
    })
    .field('toc', ['object', 'string'], {
      normalize: fields.toc(app, opts)
    });

  // template related
  schema
    .field('layout', ['object', 'string', 'boolean', 'null'], {
      normalize: fields.layout(app, opts)
    });

  var fn = schema.normalize;
  schema.normalize = function(argv) {
    if (argv.isNormalized) {
      return argv;
    }
    var obj = processArgv(app, argv);
    var res = fn.call(schema, obj, opts);

    for (var key in utils.aliases) {
      if (res.hasOwnProperty(key)) {
        res[utils.aliases[key]] = res[key];
      }
    }

    res.isNormalized = true;
    return res;
  };
  return schema;
};
