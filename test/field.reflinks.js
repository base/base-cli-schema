'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.reflinks', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
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
      assert.deepEqual(obj, {reflinks: ['foo', 'bar']});
    });

    it('should filter falsey values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,']);
      assert.deepEqual(obj, {reflinks: ['foo']});
    });

    it('should split comma-separated values on `reflinks`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,bar']);
      assert.deepEqual(obj, {reflinks: ['foo', 'bar']});
    });

    it('should split comma-separated values on `reflinks=list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks:foo,bar']);
      assert.deepEqual(obj, {reflinks: ['foo', 'bar']});
    });

    it('should split comma-separated values on `reflinks:list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks=foo,bar']);
      assert.deepEqual(obj, {reflinks: ['foo', 'bar']});
    });

    it('should split comma-separated values on `reflinks list`', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--reflinks foo,bar']);
      assert.deepEqual(obj, {reflinks: ['foo', 'bar']});
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
      assert.deepEqual(obj, {reflinks: ['foo', 'bar']});
    });

    it('should filter falsey values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({reflinks: 'foo,'});
      assert.deepEqual(obj, {reflinks: ['foo']});
    });
  });
});
