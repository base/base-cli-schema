'use strict';

var merge = require('merge-deep');
var condense = require('../condense');
var debug = require('../debug');
var utils = require('../utils');

module.exports = function(app) {
  return function(val, key, config, schema) {
    debug.field(key, val);

    // get the package.json config object
    var pkg = utils.extend({}, app.pkg.data);
    var pkgConfig = pkg[app._name] || {};

    // ensure `val` is an object before normalizing
    val = normalize(val, key, config);

    if (typeof val === 'undefined') {
      return;
    }

    var merged = merge({}, pkgConfig, val);
    var newVal = condense(app, merged, pkgConfig);
    return newVal;
  };
};

function normalize(val, key, config) {
  if (typeof val === 'undefined') {
    return;
  }

  if (typeof val === 'string') {
    var obj = {};
    obj[val] = true;
    val = config[key] = obj;
    return val;
  }

  if (val === true) {
    return { show: true };
  }
  return val;
}
