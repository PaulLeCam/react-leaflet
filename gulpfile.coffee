gulp = require "gulp"
$ = require("gulp-load-plugins")()
source = require "vinyl-source-stream2"
browserify = require "browserify"
coffeeify = require "coffeeify"
rimraf = require "rimraf"
react = require "react"

gulp.task "clean:lib", (cb) ->
  rimraf "./lib", cb

gulp.task "compile", ["clean:lib"], ->
  gulp.src "./src/**/*"
  .pipe $.coffee(bare: yes).on "error", $.util.log
  .pipe gulp.dest "./lib"

gulp.task "example:deps", ->
  browserify()
  .require "react"
  .require "react/addons"
  .require "leaflet"
  .require "./", expose: "react-leaflet"
  .bundle()
  .pipe source "dependencies.js"
  .pipe gulp.dest "./example/js"

gulp.task "example:simple", ->
  browserify
    entries: "./example/simple.coffee"
    extensions: [".coffee"]
    bundleExternal: no
  .transform coffeeify
  .bundle()
  .pipe source "simple.js"
  .pipe gulp.dest "./example/js"

gulp.task "example:server", ->
  gulp.src "./example"
  .pipe $.webserver()

gulp.task "example", [
  "example:deps"
  "example:simple"
  "example:server"
]

gulp.task "watch", ["compile"], ->
  gulp.watch "./src/**/*", ["compile"]

gulp.task "default", ["compile"]
