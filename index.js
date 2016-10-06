/*jshint node:true*/

const WatchedDir = require('broccoli-source').WatchedDir;

function Pruner () {}

Pruner.prototype.toTree = function (tree, inputPath, outputPath, inputOptions) {
  return new WatchedDir('app/styles', {})
}

module.exports = {
  name: 'ember-cli-prune-style-tree',

  setupPreprocessorRegistry (type, registry) {
    registry.add('css', new Pruner());
  },
  included: function included(app) {
    this._super.included.apply(this, arguments);
    this.app = app;
    this.setupPreprocessorRegistry('parent', app.registry);
  }
};
