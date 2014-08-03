gulp = require "gulp"
$ = require("gulp-load-plugins")()
source = require "vinyl-source-stream2"
browserify = require "browserify"
coffeeify = require "coffeeify"
rimraf = require "rimraf"
react = require "react"

gulp.task "clean", (cb) ->
  rimraf "./lib", cb

gulp.task "compile", ["clean"], ->
  gulp.src "./src/**/*"
  .pipe $.coffee(bare: yes).on "error", $.util.log
  .pipe gulp.dest "./lib"

gulp.task "example:bundle", ->
  browserify
    entries: "./example/simple.coffee"
    extensions: [".coffee"]
  .transform coffeeify
  .bundle()
  .pipe source "simple.js"
  .pipe gulp.dest "./example"

gulp.task "example:server", ->
  gulp.src "./example"
  .pipe $.webserver()

gulp.task "example", ["example:bundle", "example:server"]

gulp.task "watch", ["compile"], ->
  gulp.watch "./src/**/*", ["compile"]

gulp.task "default", ["compile"]
