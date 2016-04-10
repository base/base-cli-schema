'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var cli = require('base-cli');
var argv = require('base-argv');
var cliSchema = require('..');
var app, base;

describe('base-cli-schema', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
  });

  it('should throw an error when base-argv is not registered', function(cb) {
    base = new Base();
    try {
      cliSchema(base);
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected base-argv to be registered');
      cb();
    }
  });

  it('should export a function', function() {
    assert.equal(typeof cliSchema, 'function');
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

  it('should normalize the given object', function() {
    var schema = cliSchema(app)
      .field('foo', 'string', {
        normalize: function() {
          return 'bar';
        }
      });

    var obj = schema.normalize({});
    assert.deepEqual(obj, {foo: 'bar'});
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
