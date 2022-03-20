const gulp = require('gulp');

const { series, parallel, dest } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

filesPath = {
  sass: './src/scss/style.scss',
  js: './src/js/**/*.js',
}

// Sass Task
function sassTask(done) {
  gulp
    .src(filesPath.sass)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(
      rename(function(path) {
        if (!path.extname.endsWith('.map')) {
          path.basename += '.min'
        }
    })
    )
    .pipe(dest('./'));
  done();
}

// Javascript Task
function jsTask(done) {
  gulp
    .src(['./src/js/script.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
      })
    )
    .pipe(dest('./dist/js'))
  done();
}

// Watch Task with BroswerSync Task 
function watch() {
    browserSync.init({
      server: {
      baseDir: './'
      },
      browser: 'firefox developer edition'
    });

    gulp
      .watch(
        [
          filesPath.sass, 
          '**/*.html', 
          filesPath.js
        ], 
        gulp.parallel([sassTask, jsTask])
      )
      .on('change', browserSync.reload);
}

// Gulp Individual Tasks
exports.sassTask = sassTask;
exports.jsTask = jsTask;
exports.watch = watch;

// Gulp Serve
exports.build = parallel(sassTask, jsTask);

// Gulp default command
exports.default = series(exports.build, watch);