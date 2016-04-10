'use strict';

require('mocha');
var assert = require('assert');
var cliSchema = require('..');
var argv = require('base-argv');
var Base = require('base');
var app;

describe('.tasks', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

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
