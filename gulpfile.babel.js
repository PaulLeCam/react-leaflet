import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';

import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

const $ = gulpLoadPlugins();

const exampleSrc = './example';
const exampleBuild = './example/build';

const logTime = fileName => {
  const name = $.util.colors.cyan(fileName);
  return ms => {
    const time = ms < 1000
      ? $.util.colors.magenta(ms + ' ms')
      : $.util.colors.magenta(ms / 1000 + ' s');
    $.util.log(`Browserified ${ name } in ${ time }`);
  };
};

const bundleExample = (b, fileName) => {
  return b.bundle()
  .pipe(source(fileName))
  .pipe(gulp.dest('./example/build'));
};

const watchExample = (b, fileName) => {
  const w = watchify(b).on('time', logTime(fileName));
  const bundle = () => bundleExample(w, fileName);
  w.on('update', bundle);
  return bundle();
};

const simpleBundler = browserify(exampleSrc + '/app.js', watchify.args)
  .external('react')
  .external('leaflet')
  .external('react-leaflet')
  .transform(babelify);

gulp.task('example:deps', () => {
  const bundler = browserify()
    .require('react')
    .require('leaflet');
  return bundleExample(bundler, 'dependencies.js');
});

gulp.task('example:lib', () => {
  const bundler = browserify()
    .external('react')
    .external('leaflet')
    .require('./', {expose: 'react-leaflet'})
  return bundleExample(bundler, 'lib.js');
});

gulp.task('example:server', () => gulp
  .src('./example')
  .pipe($.webserver({
    fallback: 'index.htm'
  }))
);

gulp.task('example:app', () => bundleExample(simpleBundler, 'app.js'));

gulp.task('watch:example:lib', ['example:deps'], () => {
  return gulp.watch('./lib/**', ['example:lib']);
});

gulp.task('watch:example:app', ['example:deps', 'example:lib'], () => {
  return watchExample(simpleBundler, 'app.js');
});

gulp.task('watch:example', [
  'example:server',
  'watch:example:lib',
  'watch:example:app'
]);

gulp.task('default', ['example:deps', 'example:lib', 'example:app']);
