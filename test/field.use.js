'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe.only('.use', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should conver arg to an absolute path', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--use=foo']);
      assert.equal(obj.use[0], path.resolve('foo'));
    });

    it('should convert a string to an array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--use=foo,bar,baz']);
      assert.deepEqual(obj, {
        use: [
          path.resolve('foo'),
          path.resolve('bar'),
          path.resolve('baz')
        ]
      });
    });
  });

  describe('options object', function() {
    it('should convert a string to an array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({use: 'foo'});
      assert.deepEqual(obj, {use: [path.resolve('foo')]});
    });
  });
});
