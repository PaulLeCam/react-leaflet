gulp = require "gulp"
$ = require("gulp-load-plugins")()
source = require "vinyl-source-stream2"
browserify = require "browserify"
coffeeify = require "coffeeify"
watchify = require "watchify"
rimraf = require "rimraf"
react = require "react"

logTime = (fileName) ->
  name = $.util.colors.cyan fileName
  (ms) ->
    time =
      if ms < 1000 then $.util.colors.magenta "#{ ms } ms"
      else $.util.colors.magenta "#{ ms / 1000 } s"
    $.util.log "Browserified '#{ name }' after #{ time }"

bundleExample = (b, fileName) ->
  b.bundle()
  .pipe source fileName
  .pipe gulp.dest "./example/js"

watchExample = (b, fileName) ->
  w = watchify b
  .on "time", logTime fileName
  bundle = ->
    bundleExample w, fileName
  w.on "update", bundle
  bundle()

simpleOpts =
  entries: "./example/simple.coffee"
  extensions: [".coffee"]
  cache: {}
  packageCache: {}
  fullPaths: on

simpleBundler = browserify simpleOpts
  .external "react"
  .external "react/addons"
  .external "leaflet"
  .external "react-leaflet"
  # .require "./", expose: "react-leaflet"
  .transform coffeeify

libBundler =

gulp.task "clean", (cb) ->
  rimraf "./lib", cb

gulp.task "compile", ->
  gulp.src "./src/**/*"
  .pipe $.coffee(bare: yes).on "error", $.util.log
  .pipe gulp.dest "./lib"

gulp.task "example:deps", ->
  bundler = browserify()
    .require "react"
    .require "react/addons"
    .require "leaflet"
  bundleExample bundler, "dependencies.js"

gulp.task "example:lib", ->
  bundler = browserify()
    .external "react"
    .external "react/addons"
    .external "leaflet"
    .require "./", expose: "react-leaflet"
  bundleExample bundler, "lib.js"

gulp.task "watch:lib", ["example:lib"], ->
  gulp.watch "./lib/**", ["example:lib"]

gulp.task "example:simple", ->
  bundleExample simpleBundler, "simple.js"

gulp.task "watch:simple", ->
  watchExample simpleBundler, "simple.js"

gulp.task "example:server", ->
  gulp.src "./example"
  .pipe $.webserver()

gulp.task "example", [
  "example:deps"
  "example:simple"
  "example:server"
]

gulp.task "watch:example", [
  "example:deps"
  "watch:lib"
  "watch:simple"
]

gulp.task "watch", [
  "compile"
  "example:server"
  "watch:example"
], ->
  gulp.watch "./src/**/*", ["compile"]

gulp.task "default", ["compile"]
