'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var assemble = require('assemble-core');
var cliSchema = require('..');
var argv = require('base-argv');
var cwd = require('base-cwd');
var pkg = require('base-pkg');
var app;

var dir = process.cwd();
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

describe('.asyncHelpers', function() {
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

  describe('argv (--asyncHelper)', function() {
    it('should not choke on an empty value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelper=""']);
      assert.deepEqual(obj, {});
    });

    it('should register an object of asyncHelpers by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelpers=test/fixtures/asyncHelpers/lower.js']);
      assert(obj.asyncHelpers[0], 'test/fixtures/asyncHelpers/lower.js');
    });

    it('should register an object of asyncHelpers with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelper="test/fixtures/asyncHelpers/lower.js"']);
      assert(obj.asyncHelpers[0], 'test/fixtures/asyncHelpers/lower.js');
    });
  });

  describe('argv (--asyncHelpers)', function() {
    it('should arrayify a single asyncHelper', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelpers=bar']);
      assert.deepEqual(obj.asyncHelpers, ['bar']);
    });

    it('should add an array of asyncHelpers', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelpers=bar,baz']);
      assert.deepEqual(obj.asyncHelpers, ['bar', 'baz']);
    });

    it('should add a glob of sync asyncHelpers to config', function() {
      var args = ['--asyncHelpers="test/fixtures/asyncHelpers/*.js"'];
      var schema = cliSchema(app);
      var obj = schema.normalize(args);
      assert.deepEqual(obj.asyncHelpers, ['test/fixtures/asyncHelpers/*.js']);
    });

    it('should register an object of asyncHelpers by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelpers=test/fixtures/asyncHelpers/lower.js']);
      assert(obj.asyncHelpers[0], 'test/fixtures/asyncHelpers/lower.js');
    });

    it('should register an object of asyncHelpers with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelpers="test/fixtures/asyncHelpers/lower.js"']);
      assert(obj.asyncHelpers[0], 'test/fixtures/asyncHelpers/lower.js');
    });

    it('should remove undefined values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--asyncHelpers=""']);
      assert.deepEqual(obj, {});
    });
  });

  /**
   * TODO: omit function values from `config`
   */

  describe('options object --asyncHelpers', function() {
    it('should register an object of asyncHelper functions', function() {
      var actual = {
        config: {
          asyncHelpers: {
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
