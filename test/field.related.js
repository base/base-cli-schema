'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.related', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  describe('argv', function() {
    it('should move a string value to `related.list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related=foo']);
      assert.deepEqual(obj, {related: { list: ['foo']}});
    });

    it('should move comma-separated values to `related.list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related=foo,bar']);
      assert.deepEqual(obj, {related: {list: ['foo', 'bar']}});
    });

    it('should filter falsey values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related=foo,']);
      assert.deepEqual(obj, {related: {list: ['foo']}});
    });

    it('should split comma-separated values on `related.list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related.list=foo,bar']);
      assert.deepEqual(obj, {related: {list: ['foo', 'bar']}});
    });

    it('should split comma-separated values on `related=list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related=list:foo,bar']);
      assert.deepEqual(obj, {related: {list: ['foo', 'bar']}});
    });

    it('should split comma-separated values on `related:list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related.list=foo,bar']);
      assert.deepEqual(obj, {related: {list: ['foo', 'bar']}});
    });

    it('should split comma-separated values on `related list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--related list:foo,bar']);
      assert.deepEqual(obj, {related: {list: ['foo', 'bar']}});
    });
  });

  describe('options object', function() {
    it('should move a string value to `related.list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({related: 'foo'});
      assert.deepEqual(obj, {related: { list: ['foo']}});
    });

    it('should move comma-separated values to `related.list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({related: 'foo,bar'});
      assert.deepEqual(obj, {related: {list: ['foo', 'bar']}});
    });

    it('should filter falsey values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({related: 'foo,'});
      assert.deepEqual(obj, {related: {list: ['foo']}});
    });
  });
});
