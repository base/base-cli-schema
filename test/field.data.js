'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.data', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  describe('argv', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--data']);
      assert.deepEqual(obj, {data: {show: true}});
    });

    it('should convert a string to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--data=foo']);
      assert.deepEqual(obj, {data: {foo: true}});
    });

    it('should expand objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--data=foo:bar']);
      assert.deepEqual(obj, {data: {foo: 'bar'}});
    });
  });

  describe('options', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({data: true});
      assert.deepEqual(obj, {data: {show: true}});
    });

    it('should convert a string to an object property with a boolean value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({data: 'foo'});
      assert.deepEqual(obj, {data: {foo: true}});
    });

    it('should return objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({data: {foo: 'bar'}});
      assert.deepEqual(obj, {data: {foo: 'bar'}});
    });
  });
});
