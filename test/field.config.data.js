'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var App = require('./support');
var del = require('delete');
var cliSchema = require('..');
var app;

var cwd = process.cwd();
var fixtures = path.resolve(__dirname, 'fixtures');
var pkgPath = path.resolve(fixtures, 'package.json');
var pkgTmpl = {
  'name': 'fixtures',
  'version': '0.0.0',
  'private': true,
  'description': '',
  'main': 'index.js',
  'license': 'MIT'
};

describe('.config.data', function() {
  beforeEach(function() {
    app = new App();
    app.cwd = fixtures;
    app.pkg.set(pkgTmpl);
    app.pkg.save();
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);
      app.pkg.data = {};
      cb();
    });
  });

  after(function() {
    app.cwd = cwd;
  });

  describe('argv', function() {
    it('should expand an array of objects', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.data=foo:bar,baz:qux']);
      assert.deepEqual(obj.config, {data: {foo: 'bar', baz: 'qux'}});
    });

    it('should merge with existing data', function() {
      app.pkg.set([app._name, 'data'], {one: 'two'});

      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.data=foo:bar,baz:qux']);
      assert.deepEqual(obj.config, {data: {foo: 'bar', baz: 'qux', one: 'two'}});
    });
  });

  describe('options object', function() {
    it('should convert a boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {data: {foo: 'bar'}}});
      assert.deepEqual(obj.config.data, {foo: 'bar'});
    });
  });
});
