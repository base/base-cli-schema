'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.save', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should add an `-s` alias', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--save']);
      assert.deepEqual(obj, {save: true, s: true});
    });

    it('should convert a string to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--save=foo']);
      assert.deepEqual(obj, {save: {foo: true}, s: {foo: true}});
    });

    it('should expand objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--save=foo:bar']);
      assert.deepEqual(obj, {save: {foo: 'bar'}, s: {foo: 'bar'}});
    });
  });

  describe('save', function() {
    it('should convert a boolean to an object with a `show` property', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({save: true});
      assert.deepEqual(obj, {save: true, s: true});
    });

    it('should convert a string to an object property with a boolean value', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({save: 'foo'});
      assert.deepEqual(obj, {save: {foo: true}, s: {foo: true}});
    });

    it('should return objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({save: {foo: 'bar'}});
      assert.deepEqual(obj, {save: {foo: 'bar'}, s: {foo: 'bar'}});
    });
  });
});
