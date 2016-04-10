'use strict';

var utils = require('./utils');

module.exports = function processArgs(app, argv) {
  return app.argv(argv, {
    alias: utils.aliases,
    whitelist: utils.whitelist,
    first: ['init', 'ask', 'emit', 'global', 'save', 'config', 'file'],
    last: ['tasks'],
    esc: utils.fileKeys
  });
};
