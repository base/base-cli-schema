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

describe('.config', function() {
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

  describe('argv --config', function() {
    it('should add a `show` property when config is boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config']);
      assert.equal(obj.config.show, true);
      assert.equal(obj.c.show, true);
    });

    it('should convert a string to a boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config=foo']);
      assert.equal(obj.config.foo, true);
      assert.equal(obj.c.foo, true);
    });

    it('should set an object on package.json config', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=a:b']);
      assert.equal(obj.config.a, 'b');
      assert.equal(obj.c.a, 'b');
    });

    it('should merge an object with an existing config object', function() {
      app.pkg.set([app._name, 'foo'], 'bar');
      app.pkg.save();

      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=a:b']);
      assert.equal(obj.config.a, 'b');
      assert.equal(obj.config.foo, 'bar');
      app.pkg.del([app._name, 'foo']);
    });

    it('should normalize config.related.list from a string', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=related:foo']);
      assert.deepEqual(obj.config.related.list, ['foo']);
    });

    it('should normalize related.list from an array-string', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=related:foo,']);
      assert.deepEqual(obj.config.related.list, ['foo']);
    });

    it('should normalize related.list from an array', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=related:foo,bar,baz']);
      assert.deepEqual(obj.config.related.list, ['foo', 'bar', 'baz']);
    });

    it('should normalize related.list from an array on `list`', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=related.list:foo,bar,baz']);
      assert.deepEqual(obj.config.related.list, ['foo', 'bar', 'baz']);
    });

    it('should normalize related.list from a string on `list`', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['--config=related.list:foo']);
      assert.deepEqual(obj.config.related.list, ['foo']);
    });
  });

  describe('argv -c', function() {
    it('should merge an object with an existing config object', function() {
      app.pkg.set([app._name, 'foo'], 'bar');
      app.pkg.save();

      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=a:b']);
      assert.equal(obj.config.a, 'b');
      assert.equal(obj.config.foo, 'bar');
      app.pkg.del([app._name, 'foo']);
    });

    it('should merge config onto obj.config directly', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=a:b']);
      assert.equal(obj.config.a, 'b');
    });

    it('should add a related.list from a string', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=related:foo']);
      assert.deepEqual(obj.config.related.list, ['foo']);
    });

    it('should add a related.list from an array-string', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=related:foo,']);
      assert.deepEqual(obj.config.related.list, ['foo']);
    });

    it('should add a related.list from an array', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=related:foo,bar,baz']);
      assert.deepEqual(obj.config.related.list, ['foo', 'bar', 'baz']);
    });

    it('should add a related.list from an array on `list`', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=related.list:foo,bar,baz']);
      assert.deepEqual(obj.config.related.list, ['foo', 'bar', 'baz']);
    });

    it('should add a related.list from a string on `list`', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize(['-c=related.list:foo']);
      assert.deepEqual(obj.config.related.list, ['foo']);
    });
  });

  describe('config object', function() {
    it('should merge config onto obj.config', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize({config: {a: 'b'}});
      assert.equal(obj.config.a, 'b');
    });

    it('should merge config onto obj.config', function() {
      var schema = cliSchema(app);

      var obj = schema.normalize({config: {a: 'b'}});
      assert.equal(obj.config.a, 'b');
    });
  });
});
