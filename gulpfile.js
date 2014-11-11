var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./src/**/*.js'],
  vendor: ['./vendor/**/*.js']
};

gulp.task('default', ['sass', 'js', 'vendor']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


gulp.task('vendor', function(done) {
    gulp.src(bowerFiles(bowerConf))
        .pipe(cache('vendor'))
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(angularFilesort())
        .pipe(concat('vendor.js'))
        //.pipe(ngAnnotate())
        //.pipe(sourcemaps.write('./maps'))
        //.pipe(gulp.dest('./www/js/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

gulp.task('js', function(done) {
    gulp.src(['./src/**/*.js'])
        .pipe(cache('app'))
        .pipe(angularFilesort())
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat('all.js'))
            .pipe(ngAnnotate())
        //.pipe(sourcemaps.write('./maps'))
        //.pipe(gulp.dest('./www/js/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
