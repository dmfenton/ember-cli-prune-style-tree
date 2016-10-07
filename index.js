/*jshint node:true*/
const Funnel = require('broccoli-funnel')

function Pruner () {}

Pruner.prototype.toTree = function (tree, inputPath, outputPath, inputOptions) {
  // ensure that the tree is not pruned after the sass compiler
  if (tree._inputNodes[0] && tree._inputNodes[0]._name === 'SassCompiler') return tree
  
  return new Funnel('app/styles', {
    srcDir: '/',
    destDir: 'app/styles',
    annotation: 'Funnel (pruned styles)'
  })
}

module.exports = {
  name: 'ember-cli-prune-style-tree',

  setupPreprocessorRegistry (type, registry) {
    registry.add('css', new Pruner());
  },

  included (app) {
    this._super.included.apply(this, arguments);
    this.app = app;
    this.setupPreprocessorRegistry('parent', app.registry);
  }
};
