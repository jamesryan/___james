var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer');

gulp.task('sass', function () {
   gulp.src('/dev/scss/main.scss')
       .pipe(sass())
       .pipe(prefix({
           browsers: ['last 2 versions']
       }))
       .pipe(gulp.dest('/_/css'));
});

gulp.task('scripts', function () {
   return gulp.src(['dev/js/*.js'])
       .pipe(uglify())
       .pipe(concat('../_/js/main.js'))
       .pipe(gulp.dest('js'))
});

gulp.task('vendors', function () {
  return gulp.src('dev/vendor/*.js')
          .pipe(uglify())
          .pipe(concat('vendors.js'))
          .pipe(gulp.dest('js/vendor'))
  });

gulp.task('jadei', function () {
  return gulp.src('*.jade')
        .pipe(jade())
        .pipe(gulp.dest(''));
  });
gulp.task('jadeT', function () {
  return gulp.src('dev/templates/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('pub_pages'));
  });

//watcher task
gulp.task('watch', function() {
   // Watch .scss files
  gulp.watch('./dev/scss/*.scss', ['sass']);
   // Watch .js files
  gulp.watch('dev/js/**/*.js', ['scripts']);

  gulp.watch('dev/vendor/*.js', ['vendors']);
   // Watch index files
  gulp.watch('*.jade', ['jadei']);
  // Watch template files
  gulp.watch('dev/templates/**/*.jade', ['jadeT']);
 });

// Default tasks
gulp.task('default', ['sass', 'scripts', 'vendors', 'jadei', 'jadeT']);