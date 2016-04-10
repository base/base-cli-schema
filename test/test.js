'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var cli = require('base-cli');
var argv = require('base-argv');
var cliSchema = require('..');
var app;

describe('base-cli-schema', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(argv());
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
});
