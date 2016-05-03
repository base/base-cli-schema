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

describe('.config.toc', function() {
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
    it('should expand an object', function() {
      var schema = cliSchema(app);
      assert.deepEqual(schema.normalize(['--config.toc=render']).config.toc, true);
      assert.deepEqual(schema.normalize(['--config.toc=render:true']).config.toc, true);
      assert.deepEqual(schema.normalize(['--config.toc=render:false']).config.toc, false);
    });

    it('should remove invalid values', function() {
      var schema = cliSchema(app);
      assert.deepEqual(schema.normalize(['--config.toc=foo']), {});
      assert.deepEqual(schema.normalize(['--config.toc=foo:true']), {});
      assert.deepEqual(schema.normalize(['--config.toc=foo:false']), {});
    });

    it('should convert false boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.toc=false']);
      assert.deepEqual(obj.config.toc, false);
    });

    it('should convert true boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.toc=true']);
      assert.deepEqual(obj.config.toc, true);
    });

    it('should convert true to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize(['--config.toc']);
      assert.deepEqual(obj.config.toc, true);
    });
  });

  describe('options object', function() {
    it('should convert a boolean to an object', function() {
      var schema = cliSchema(app);
      var obj = schema.normalize({config: {toc: false}});
      assert.deepEqual(obj.config.toc, false);
    });
  });
});
