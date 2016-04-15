'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var App = require('./support');
var del = require('delete');
var cliSchema = require('..');
var app;

var cwd = process.cwd();
var fixtures = path.resolve(__dirname, 'fixtures');
var pkgPath = path.resolve(fixtures, 'package.json');
var pkgTmpl = {
  'name': 'fixtures',
  'version': '0.0.0',
  'private': true,
  'description': '',
  'main': 'index.js',
  'license': 'MIT'
};

describe('.config.tasks', function() {
  beforeEach(function() {
    app = new App();
    app.cwd = fixtures;
    app.pkg.set(pkgTmpl);
    app.pkg.save();
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);
      app.pkg.data = {};
      cb();
    });
  });

  after(function() {
    app.cwd = cwd;
  });

  describe('.config.tasks', function() {
    it('should remove undefined', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.tasks=,,,']);
      assert.deepEqual(obj, {});
    });

    it('should remove booleans', function() {
      var schema = cliSchema(app);
      assert.deepEqual(schema.normalize(['--config.tasks']), {});
      assert.deepEqual(schema.normalize(['--config.tasks=false']), {});
      assert.deepEqual(schema.normalize(['--config.tasks=true']), {});
    });

    it('should arrayify a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.tasks=default']);
      assert.deepEqual(obj.config, {tasks: ['default']});
    });

    it('should split comma-separated tasks', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.tasks=foo,bar,baz']);
      assert.deepEqual(obj.config, {tasks: ['foo', 'bar', 'baz']});
      assert.deepEqual(obj.c, {tasks: ['foo', 'bar', 'baz']});
    });
  });

  describe('options object', function() {
    it('should remove undefined', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {tasks: undefined}});
      assert.deepEqual(obj, {});
    });

    it('should remove undefined in array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {tasks: [undefined]}});
      assert.deepEqual(obj, {});
    });

    it('should arrayify a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {tasks: 'default'}});
      assert.deepEqual(obj.config, {tasks: ['default']});
      assert.deepEqual(obj.c, {tasks: ['default']});
    });

    it('should return an array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {tasks: ['default']}});
      assert.deepEqual(obj.config, {tasks: ['default']});
      assert.deepEqual(obj.c, {tasks: ['default']});
    });

    it('should split comma-separated tasks', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {tasks: 'foo,bar,baz'}});
      assert.deepEqual(obj.config, {tasks: ['foo', 'bar', 'baz']});
      assert.deepEqual(obj.c, {tasks: ['foo', 'bar', 'baz']});
    });
  });
});
