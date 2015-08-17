var browserify = require('browserify');
var babelify = require("babelify");
var transformTools = require('browserify-transform-tools');
var options = {
  standalone: 'ReactLeaflet',
}
// var b = browserify('./lib/index.js', options);
var b = browserify('./src/index.js', options);

var transform = transformTools.makeRequireTransform("requireTransform",
  {evaluateArguments: true},
  function(args, opts, cb) {
      var globalMap = {
        'react': 'window.React',
        'leaflet': 'window.L',
        'react/addons': 'window.React'
      }
      var mapped = globalMap[args[0]]
      if (mapped) {
          return cb(null, mapped);
      } else {
          return cb();
      }
  });

b.exclude("react")
b.exclude("react/addons")
b.exclude("leaflet")
b.transform(babelify, {optional: ["es7.objectRestSpread"]})
b.transform(transform)
b.bundle().pipe(process.stdout);
