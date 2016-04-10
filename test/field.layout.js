'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.layout', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
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
