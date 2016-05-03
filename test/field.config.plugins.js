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

describe('.config.plugins', function() {
  beforeEach(function(cb) {
    app = assemble();
    app.use(argv());
    app.use(cwd());
    app.cwd = fixtures();
    app.use(pkg());
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

  describe('argv (--config.plugin)', function() {
    it('should not choke on an empty value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins=""']);
      assert.deepEqual(obj, {});
    });

    it('should register an object of plugins by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins=test/fixtures/plugins/lower.js']);
      assert(obj.config.plugins[0], 'test/fixtures/plugins/lower.js');
    });

    it('should register an object of plugins with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins="test/fixtures/plugins/lower.js"']);
      assert(obj.config.plugins[0], 'test/fixtures/plugins/lower.js');
    });
  });

  describe('argv (--config.plugins)', function() {
    it('should union a string with existing plugins', function() {
      app.pkg.set([app._name, 'plugins'], ['foo']);
      app.pkg.save();

      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins=bar']);
      assert.deepEqual(obj.config.plugins, ['foo', 'bar']);
    });

    it('should union an array with existing plugins', function() {
      app.pkg.set([app._name, 'plugins'], ['foo']);
      app.pkg.save();

      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins=bar,baz']);
      assert.deepEqual(obj.config.plugins, ['foo', 'bar', 'baz']);
      app.pkg.del([app._name, 'plugins']);
      app.pkg.save();
    });

    it('should add a glob of sync plugins to config', function() {
      var args = ['--config.plugins="test/fixtures/plugins/*.js"'];
      var schema = cliSchema(app);
      var obj = schema.normalize(args);
      assert.deepEqual(obj.config.plugins, ['test/fixtures/plugins/*.js']);
    });

    it('should register an object of plugins by filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins=test/fixtures/plugins/lower.js']);
      assert(obj.config.plugins[0], 'test/fixtures/plugins/lower.js');
    });

    it('should register an object of plugins with quoted filepaths', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins="test/fixtures/plugins/lower.js"']);
      assert(obj.config.plugins[0], 'test/fixtures/plugins/lower.js');
    });

    it('should remove undefined values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.plugins=""']);
      assert.deepEqual(obj, {});
    });
  });

  /**
   * TODO: omit function values from `config`
   */

  describe('options object --config.plugins', function() {
    it('should register an object of plugin functions', function() {
      var schema = cliSchema(app);
      var actual = {
        config: {
          plugins: {
            lower: function() {},
            upper: function() {}
          }
        }
      };

      var obj = schema.normalize(actual);
      assert.deepEqual(obj.config, actual.config);
    });
  });
});
