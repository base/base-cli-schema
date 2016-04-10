'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.toc', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  describe('argv', function() {
    it('should return an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--toc=render:false']);
      assert.deepEqual(obj, {toc: {render: false}});
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
