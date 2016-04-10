'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.enable', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  describe('argv', function() {
    it('should remove value when it is a boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--enable']);
      assert.deepEqual(obj, {});
    });

    it('should tableize an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--enable=foo.bar']);
      assert.deepEqual(obj, {enable: 'foo.bar'});
    });

    it('should return unmodified when value is a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--enable=foo']);
      assert.deepEqual(obj, {enable: 'foo'});
    });
  });

  describe('options', function() {
    it('should remove value when it is a boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({enable: true});
      assert.deepEqual(obj, {});
    });

    it('should tableize an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({enable: {foo: 'bar'}});
      assert.deepEqual(obj, {enable: 'foo.bar'});
    });

    it('should return unmodified when value is a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({enable: 'foo'});
      assert.deepEqual(obj, {enable: 'foo'});
    });
  });
});
