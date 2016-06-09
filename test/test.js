'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var App = require('./support');
var pkg = require('base-pkg');
var cwd = require('base-cwd');
var cliSchema = require('..');
var app;

describe('base-cli-schema', function() {
  beforeEach(function() {
    app = new App();
  });

  it('should export a function', function() {
    assert.equal(typeof cliSchema, 'function');
  });

  it('should throw an error when base-cwd is not registered', function(cb) {
    try {
      var base = new Base();
      cliSchema(base);
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected the base-cwd plugin to be registered');
      cb();
    }
  });

  it('should throw an error when base-pkg is not registered', function(cb) {
    try {
      var base = new Base({isApp: true});
      base.use(cwd());
      cliSchema(base);
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected the base-pkg plugin to be registered');
      cb();
    }
  });

  it('should throw an error when base-argv is not registered', function(cb) {
    try {
      var base = new Base({isApp: true});
      base.use(cwd());
      base.use(pkg());
      cliSchema(base);
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected the base-argv plugin to be registered');
      cb();
    }
  });

  it('should add fields to the schema', function() {
    var schema = cliSchema(app)
      .field('foo', 'string', {
        normalize: function() {
          return 'bar';
        }
      });
    assert(schema.fields.hasOwnProperty('foo'));
  });

  it('should add a non-enumerable isNormalized property', function() {
    var schema = cliSchema(app)
      .field('foo', 'string', {
        normalize: function() {
          return 'bar';
        }
      });

    var obj = schema.normalize({});
    assert.equal(obj.isNormalized, true);
  });

  it('should return the object if `isNormalized` is true', function() {
    var schema = cliSchema(app);
    var obj = {toc: true, isNormalized: true};
    var a = schema.normalize(obj);
    var b = schema.normalize(a);
    var c = schema.normalize(b);
    assert.deepEqual(c, obj);
  });
});
