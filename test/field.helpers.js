'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var assemble = require('assemble-core');
var cliSchema = require('..');
var argv = require('base-argv');
var cwd = require('base-cwd');
var pkg = require('base-pkg');
var del = require('delete');
var app;

var dir = process.cwd();
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

describe('.helpers', function() {
  beforeEach(function(cb) {
    app = assemble();
    app.use(argv());
    app.use(cwd());
    app.cwd = fixtures();
    app.use(pkg());
    cb();
  });

  afterEach(function() {
    app.cwd = dir;
  });

  describe('argv (--helper)', function() {
    it('should not choke on an empty value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helper=""']);
      assert.deepEqual(obj, {});
    });

    it('should register an object of helpers by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helpers=test/fixtures/helpers/lower.js']);
      assert(obj.helpers[0], 'test/fixtures/helpers/lower.js');
    });

    it('should register an object of helpers with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helper="test/fixtures/helpers/lower.js"']);
      assert(obj.helpers[0], 'test/fixtures/helpers/lower.js');
    });
  });

  describe('argv (--helpers)', function() {
    it('should arrayify a single helper', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helpers=bar']);
      assert.deepEqual(obj.helpers, ['bar']);
    });

    it('should add an array of helpers', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helpers=bar,baz']);
      assert.deepEqual(obj.helpers, ['bar', 'baz']);
    });

    it('should add a glob of sync helpers to config', function() {
      var args = ['--helpers="test/fixtures/helpers/*.js"'];
      var schema = cliSchema(app);
      var obj = schema.normalize(args);
      assert.deepEqual(obj.helpers, ['test/fixtures/helpers/*.js']);
    });

    it('should register an object of helpers by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helpers=test/fixtures/helpers/lower.js']);
      assert(obj.helpers[0], 'test/fixtures/helpers/lower.js');
    });

    it('should register an object of helpers with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helpers="test/fixtures/helpers/lower.js"']);
      assert(obj.helpers[0], 'test/fixtures/helpers/lower.js');
    });

    it('should remove undefined values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--helpers=""']);
      assert.deepEqual(obj, {});
    });
  });

  /**
   * TODO: omit function values from `config`
   */

  describe('options object --helpers', function() {
    it('should register an object of helper functions', function() {
      var actual = {
        config: {
          helpers: {
            lower: function() {},
            upper: function() {}
          }
        }
      };

      var schema = cliSchema(app);
      var obj = schema.normalize(actual);
      assert.deepEqual(obj.config, actual.config);
      assert.deepEqual(obj.c, actual.config);
    });
  });
});
