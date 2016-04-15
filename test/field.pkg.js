'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.pkg', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--pkg']);
      assert.deepEqual(obj, {pkg: {show: true}});
    });

    it('should convert a string to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--pkg=foo']);
      assert.deepEqual(obj, {pkg: {foo: true}});
    });

    it('should expand objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--pkg=foo:bar']);
      assert.deepEqual(obj, {pkg: {foo: 'bar'}});
    });
  });

  describe('pkg', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({pkg: true});
      assert.deepEqual(obj, {pkg: {show: true}});
    });

    it('should convert a string to an object property with a boolean value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({pkg: 'foo'});
      assert.deepEqual(obj, {pkg: {foo: true}});
    });

    it('should return objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({pkg: {foo: 'bar'}});
      assert.deepEqual(obj, {pkg: {foo: 'bar'}});
    });
  });
});
