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
var pkgPath = fixtures('package.json');
var pkgTmpl = {
  'name': 'fixtures',
  'version': '0.0.0',
  'private': true,
  'description': '',
  'main': 'index.js',
  'license': 'MIT'
};

describe('.config.helpers', function() {
  beforeEach(function(cb) {
    app = assemble();
    app.use(argv());
    app.use(cwd());
    app.use(pkg());
    app.cwd = fixtures();
    app.pkg.data = {};
    app.pkg.set(pkgTmpl);
    app.pkg.save();
    cb();
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);
      app.pkg.data = {};
      cb();
    });
  });

  after(function() {
    app.cwd = dir;
  });

  describe('argv (--config.helper)', function() {
    it('should not choke on an empty value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helper=""']);
      assert.deepEqual(obj, {});
    });

    it('should register an object of helpers by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helpers=test/fixtures/helpers/lower.js']);
      assert(obj.config.helpers[0], 'test/fixtures/helpers/lower.js');
    });

    it('should register an object of helpers with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helper="test/fixtures/helpers/lower.js"']);
      assert(obj.config.helpers[0], 'test/fixtures/helpers/lower.js');
    });
  });

  describe('argv (--config.helpers)', function() {
    it('should union a string with existing helpers', function() {
      app.pkg.set([app._name, 'helpers'], ['foo']);
      app.pkg.save();

      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helpers=bar']);
      assert.deepEqual(obj.config.helpers, ['foo', 'bar']);
    });

    it('should union an array with existing helpers', function() {
      app.pkg.set([app._name, 'helpers'], ['foo']);
      app.pkg.save();

      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helpers=bar,baz']);
      assert.deepEqual(obj.config.helpers, ['foo', 'bar', 'baz']);
      app.pkg.del([app._name, 'helpers']);
      app.pkg.save();
    });

    it('should add a glob of sync helpers to config', function() {
      var args = ['--config.helpers="test/fixtures/helpers/*.js"'];
      var schema = cliSchema(app);
      var obj = schema.normalize(args);
      assert.deepEqual(obj.config.helpers, ['test/fixtures/helpers/*.js']);
    });

    it('should register an object of helpers by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helpers=test/fixtures/helpers/lower.js']);
      assert(obj.config.helpers[0], 'test/fixtures/helpers/lower.js');
    });

    it('should register an object of helpers with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helpers="test/fixtures/helpers/lower.js"']);
      assert(obj.config.helpers[0], 'test/fixtures/helpers/lower.js');
    });

    it('should remove undefined values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.helpers=""']);
      assert.deepEqual(obj, {});
    });
  });

  /**
   * TODO: omit function values from `config`
   */

  describe('options object --config.helpers', function() {
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
    });
  });
});
