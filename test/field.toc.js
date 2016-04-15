'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.toc', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('argv', function() {
    it('should expand an object', function() {
      var schema = cliSchema(app);
      assert.deepEqual(schema.normalize(['--toc=render']), {toc: {render: true}});
      assert.deepEqual(schema.normalize(['--toc=render:true']), {toc: {render: true}});
      assert.deepEqual(schema.normalize(['--toc=render:false']), {toc: {render: false}});
    });

    it('should convert false boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--toc=false']);
      assert.deepEqual(obj, {toc: {render: false}});
    });

    it('should convert true boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--toc=true']);
      assert.deepEqual(obj, {toc: {render: true}});
    });

    it('should convert true to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--toc']);
      assert.deepEqual(obj, {toc: {render: true}});
    });
  });

  describe('options object', function() {
    it('should return an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({toc: {render: false}});
      assert.deepEqual(obj, {toc: {render: false}});
    });

    it('should convert a boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({toc: false});
      assert.deepEqual(obj, {toc: {render: false}});
    });
  });
});
