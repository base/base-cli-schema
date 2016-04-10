'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.disable', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  describe('argv', function() {
    it('should remove value when it is a boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--disable']);
      assert.deepEqual(obj, {});
    });

    it('should tableize an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--disable=foo.bar']);
      assert.deepEqual(obj, {disable: 'foo.bar'});
    });

    it('should return unmodified when value is a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--disable=foo']);
      assert.deepEqual(obj, {disable: 'foo'});
    });
  });

  describe('options', function() {
    it('should remove value when it is a boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({disable: true});
      assert.deepEqual(obj, {});
    });

    it('should tableize an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({disable: {foo: 'bar'}});
      assert.deepEqual(obj, {disable: 'foo.bar'});
    });

    it('should return unmodified when value is a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({disable: 'foo'});
      assert.deepEqual(obj, {disable: 'foo'});
    });
  });
});
