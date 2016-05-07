'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.use', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should conver arg to an absolute path', function() {
      app.cwd = path.resolve(__dirname, 'fixtures/use');
      var schema = cliSchema(app);
      var obj = schema.normalize(['--use=aaa']);
      assert.equal(obj.use[0], path.resolve(app.cwd, 'aaa.js'));
    });

    it('should convert a string to an array', function() {
      app.cwd = path.resolve(__dirname, 'fixtures/use');
      var schema = cliSchema(app);
      var obj = schema.normalize(['--use=aaa,bbb']);
      assert.deepEqual(obj, {
        use: [
          path.resolve(app.cwd, 'aaa.js'),
          path.resolve(app.cwd, 'bbb.js'),
        ]
      });
    });
  });

  describe('options object', function() {
    it('should convert a string to an array', function() {
      app.cwd = path.resolve(__dirname, 'fixtures/use');
      var schema = cliSchema(app);
      var obj = schema.normalize({use: 'aaa'});
      assert.deepEqual(obj, {use: [path.resolve(app.cwd, 'aaa.js')]});
    });
  });
});
