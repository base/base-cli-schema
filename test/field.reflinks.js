'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.reflinks', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should move a string value to `reflinks`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo']);
      assert.deepEqual(obj, {reflinks: ['foo']});
    });

    it('should add a `show` property when reflinks is a boolean', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks']);
      assert.deepEqual(obj, {reflinks: {show: true}});
    });

    it('should move comma-separated values to `reflinks`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,bar']);
      assert.deepEqual(obj, {reflinks: ['bar', 'foo']});
    });

    it('should filter falsey values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,']);
      assert.deepEqual(obj, {reflinks: ['foo']});
    });

    it('should split comma-separated values on `reflinks`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,bar']);
      assert.deepEqual(obj, {reflinks: ['bar', 'foo']});
    });

    it('should split comma-separated values on `reflinks=list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks:foo,bar']);
      assert.deepEqual(obj, {reflinks: ['bar', 'foo']});
    });

    it('should split comma-separated values on `reflinks:list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,bar']);
      assert.deepEqual(obj, {reflinks: ['bar', 'foo']});
    });

    it('should split comma-separated values on `reflinks list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks foo,bar']);
      assert.deepEqual(obj, {reflinks: ['bar', 'foo']});
    });
  });

  describe('options object', function() {
    it('should move a string value to `reflinks`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({reflinks: 'foo'});
      assert.deepEqual(obj, {reflinks: ['foo']});
    });

    it('should move comma-separated values to `reflinks`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({reflinks: 'foo,bar'});
      assert.deepEqual(obj, {reflinks: ['bar', 'foo']});
    });

    it('should filter falsey values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({reflinks: 'foo,'});
      assert.deepEqual(obj, {reflinks: ['foo']});
    });
  });
});
