'use strict';

var Base = require('base');
var data = require('base-data');
var argv = require('base-argv');
var cwd = require('base-cwd');
var pkg = require('base-pkg');

function App() {
  Base.call(this);
  this.is('app');
  this.use(argv());
  this.use(data());
  this.use(cwd());
  this.use(pkg());
}

Base.extend(App);

module.exports = App;
