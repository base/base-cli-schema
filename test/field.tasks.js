'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var App = require('./support');
var app;

describe('.tasks', function() {
  beforeEach(function() {
    app = new App();
  });

  describe('.tasks', function() {
    it('should remove undefined', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--tasks=,,,']);
      assert.deepEqual(obj, {});
    });

    it('should convert tasks booleans to `run`', function() {
      var schema = cliSchema(app);
      assert.deepEqual(schema.normalize(['--tasks']), {run: true});
      assert.deepEqual(schema.normalize(['--tasks=false']), {run: false});
      assert.deepEqual(schema.normalize(['--tasks=true']), {run: true});
    });

    it('should arrayify a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--tasks=default']);
      assert.deepEqual(obj, {tasks: ['default']});
    });

    it('should split comma-separated tasks', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--tasks=foo,bar,baz']);
      assert.deepEqual(obj, {tasks: ['foo', 'bar', 'baz']});
    });

    it('should comma-separated values', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['foo,bar,baz']);
      assert.deepEqual(obj, {_: ['foo', 'bar', 'baz']});
    });
  });

  describe('options object', function() {
    it('should remove undefined', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({tasks: undefined});
      assert.deepEqual(obj, {});
    });

    it('should remove undefined in array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({tasks: [undefined]});
      assert.deepEqual(obj, {});
    });

    it('should arrayify a string', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({tasks: 'default'});
      assert.deepEqual(obj, {tasks: ['default']});
    });

    it('should return an array', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({tasks: ['default']});
      assert.deepEqual(obj, {tasks: ['default']});
    });

    it('should split comma-separated tasks', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({tasks: 'foo,bar,baz'});
      assert.deepEqual(obj, {tasks: ['foo', 'bar', 'baz']});
    });
  });
});
