var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var del = require("del");
var source = require("vinyl-source-stream2");

var browserify = require("browserify");
var reactify = require("reactify");
var watchify = require("watchify");

var src = [
  "./src/**/*",
  "!./src/__tests__",
  "!./src/__tests__/**",
  "!./src/**/__tests__",
  "!./src/**/__tests__/**"
];
var lib = "./lib";

var exampleSrc = "./example";
var exampleBuild = "./example/build";

var logTime = function(fileName) {
  var name = $.util.colors.cyan(fileName);
  return function(ms) {
    var time = ms < 1000
      ? $.util.colors.magenta(ms + " ms")
      : $.util.colors.magenta(ms / 1000 + " s");
    $.util.log("Browserified '" +  name + "' in " + time);
  };
};

var bundleExample = function(b, fileName) {
  return b.bundle()
  .pipe(source(fileName))
  .pipe(gulp.dest("./example/build"));
};

var watchExample = function(b, fileName) {
  var w = watchify(b).on("time", logTime(fileName));
  var bundle = function() {
    return bundleExample(w, fileName);
  };
  w.on("update", bundle);
  return bundle();
};

simpleBundler = browserify(exampleSrc + "/app.js", watchify.args)
  .external("react")
  .external("react/addons")
  .external("leaflet")
  .external("react-leaflet")
  .transform(reactify, {es6: true});

gulp.task("clean:lib", function(cb) {
  del(lib + "/**", cb);
});

gulp.task("compile", ["clean:lib"], function() {
  return gulp.src(src)
    .pipe($.react({harmony: true}))
    .pipe(gulp.dest(lib));
});

gulp.task("watch", ["compile"], function() {
  gulp.watch(src, ["compile"]);
});

gulp.task("example:deps", function() {
  var bundler = browserify()
    .require("react")
    .require("react/addons")
    .require("leaflet");
  return bundleExample(bundler, "dependencies.js");
});

gulp.task("example:lib", function() {
  var bundler = browserify()
    .external("react")
    .external("react/addons")
    .external("leaflet")
    .require("./", {expose: "react-leaflet"})
  return bundleExample(bundler, "lib.js");
});

gulp.task("example:server", function() {
  return gulp.src("./example")
  .pipe($.webserver({
    fallback: "index.htm"
  }));
});

gulp.task("example:app", function() {
  return bundleExample(simpleBundler, "app.js");
});

gulp.task("watch:example:lib", ["example:deps"], function() {
  return gulp.watch("./lib/**", ["example:lib"]);
});

gulp.task("watch:example:app", ["example:deps", "example:lib"], function() {
  return watchExample(simpleBundler, "app.js");
});

gulp.task("watch:example", [
  "example:server",
  "watch:example:lib",
  "watch:example:app"
]);

gulp.task("default", ["compile"]);
