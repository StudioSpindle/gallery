const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const minifyCSS = require('gulp-csso');
const scss = require('gulp-dart-sass');
const concat = require('gulp-concat');

const SOURCES = {
  HTMLFolder: './src',
  SCSSFolder: './src/assets/scss',
  JSFolder: './src/assets/js',
  buildFolder: './build',
};

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: SOURCES.buildFolder,
    },
    port: 3000,
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function html() {
  return gulp.src(`${SOURCES.HTMLFolder}/index.html`)
    .pipe(gulp.dest(SOURCES.buildFolder));
}

const sourceMaps = process.env.NODE_ENV === 'production' ? '' : { sourcemaps: true };

function css() {
  return gulp.src(`${SOURCES.SCSSFolder}/main.scss`, sourceMaps)
    .pipe(scss())
    .pipe(minifyCSS())
    .pipe(gulp.dest(`${SOURCES.buildFolder}/css`, sourceMaps));
}

function js() {
  return gulp.src(`${SOURCES.JSFolder}/*.js`, sourceMaps)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(`${SOURCES.buildFolder}/js`, sourceMaps));
}

function watchFiles() {
  gulp.watch(`${SOURCES.HTMLFolder}/*`, html);
  gulp.watch(`${SOURCES.HTMLFolder}/**/*.scss`, css);
  gulp.watch(`${SOURCES.HTMLFolder}/**/*.js`, js);
  gulp.watch(`${SOURCES.buildFolder}/**/*`,
    gulp.parallel(browserSyncReload));
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.watch = watch;
exports.default = gulp.parallel(html, css, js);
