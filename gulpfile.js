var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer');

gulp.task('sass', function () {
   gulp.src('dev/scss/main.scss')
       .pipe(sass())
       .pipe(prefix({
           browsers: ['last 2 versions']
       }))
       .pipe(gulp.dest('_/css'));
});

gulp.task('scripts', function () {
   return gulp.src(['dev/js/main.js'])
       .pipe(uglify())
       //.pipe(concat('_/js/main.js'))
       .pipe(gulp.dest('_/js'))
});


//watcher task
gulp.task('watch', function() {
   // Watch .scss files
  gulp.watch('dev/scss/*.scss', ['sass']);
   // Watch .js files
  gulp.watch('dev/js/**/*.js', ['scripts']);
 });

// Default tasks
gulp.task('default', ['sass', 'scripts']);