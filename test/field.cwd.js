'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.cwd', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  describe('argv', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--cwd']);
      assert.deepEqual(obj, {cwd: {show: true}});
    });

    it('should resolve absolute path', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--cwd=foo']);
      assert.deepEqual(obj, {cwd: path.resolve('foo')});
    });

    it('should not expand object notation', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--cwd=foo.bar']);
      assert.deepEqual(obj, {cwd: path.resolve('foo.bar')});
    });
  });

  describe('options', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({cwd: true});
      assert.deepEqual(obj, {cwd: {show: true}});
    });

    it('should return an absolute path', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({cwd: 'foo'});
      assert.deepEqual(obj, {cwd: path.resolve('foo')});
    });

    it('should collapse object notation', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({cwd: {foo: 'bar'}});
      assert.deepEqual(obj, {cwd: path.resolve('foo.bar')});
    });
  });
});
