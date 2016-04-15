'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.emit', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should convert true to an array with a wildcard', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--emit']);
      assert.deepEqual(obj, {emit: ['*']});
    });

    it('should return wildcard when true', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--emit=true']);
      assert.deepEqual(obj, {emit: ['*']});
    });

    it('should split comma-separated values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--emit=foo,bar,baz']);
      assert.deepEqual(obj, {emit: ['foo', 'bar', 'baz']});
    });

    it('should convert a string to an array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--emit=foo']);
      assert.deepEqual(obj, {emit: ['foo']});
    });

    it('should not expand object notation', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--emit=foo.bar']);
      assert.deepEqual(obj, {emit: ['foo.bar']});
    });
  });

  describe('options', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({emit: true});
      assert.deepEqual(obj, {emit: ['*']});
    });

    it('should return an absolute path', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({emit: 'foo'});
      assert.deepEqual(obj, {emit: ['foo']});
    });

    it('should collapse object notation', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({emit: {foo: 'bar'}});
      assert.deepEqual(obj, {emit: ['foo.bar']});
    });
  });
});
