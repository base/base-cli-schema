'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.options', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--options']);
      assert.deepEqual(obj, {options: {show: true}});
    });

    it('should convert a string to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--options=foo']);
      assert.deepEqual(obj, {options: {foo: true}});
    });

    it('should not add arrays', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--options=foo,bar']);
      assert.deepEqual(obj, {});
    });

    it('should expand objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--options=foo:bar']);
      assert.deepEqual(obj, {options: {foo: 'bar'}});
    });
  });

  describe('options', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({options: true});
      assert.deepEqual(obj, {options: {show: true}});
    });

    it('should convert a string to an object property with a boolean value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({options: 'foo'});
      assert.deepEqual(obj, {options: {foo: true}});
    });

    it('should return objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({options: {foo: 'bar'}});
      assert.deepEqual(obj, {options: {foo: 'bar'}});
    });
  });
});
