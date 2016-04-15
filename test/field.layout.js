'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.layout', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should convert true to "default"', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--layout']);
      assert.deepEqual(obj, {layout: 'default'});
    });

    it('should return a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--layout=foo']);
      assert.deepEqual(obj, {layout: 'foo'});
    });

    it('should coerce falsey values to `false`', function() {
      var schema = cliSchema(app);
      assert.deepEqual(schema.normalize(['--layout=false']), {layout: false});
      assert.deepEqual(schema.normalize(['--layout=null']), {layout: false});
      assert.deepEqual(schema.normalize(['--layout=none']), {layout: false});
      assert.deepEqual(schema.normalize(['--layout=nil']), {layout: false});
    });

    it('should tableize object values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--layout=foo.bar']);
      assert.deepEqual(obj, {layout: 'foo.bar'});
    });
  });

  describe('options', function() {
    it('should convert true to "default"', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({layout: true});
      assert.deepEqual(obj, {layout: 'default'});
    });

    it('should return an absolute path', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({layout: 'foo'});
      assert.deepEqual(obj, {layout: 'foo'});
    });

    it('should tableize object values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({layout: {foo: 'bar'}});
      assert.deepEqual(obj, {layout: 'foo.bar'});
    });
  });
});
