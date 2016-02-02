var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    cp = require('child_process'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant');

gulp.task('images', function() {
	gulp.src('assets/img/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('assets/img'));
});

    var messages = {
        jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
    };

/*
  Starting wit jekyll... let's see what this bastid can do.
*/
    gulp.task('jekyll-build', function (done) {
        browserSync.notify(messages.jekyllBuild);
        return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
            .on('close', done);
    });

    /**
     * Rebuild Jekyll & do page reload
     */
    gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
        browserSync.reload();
    });

    gulp.task('browser-sync', ['sass','jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});


gulp.task('sass', function () {
   gulp.src('assets/scss/main.scss')
       .pipe(sass({
         includePaths: ['css'],
         onError: browserSync.notify
       }))
       .pipe(prefix({
           browsers: ['last 2 versions']
       }))
       .pipe(gulp.dest('_site/assets/css'))
       .pipe(browserSync.reload({stream:true}))
       .pipe(gulp.dest('assets/css'));
});



gulp.task('scripts', function () {
   return gulp.src(['assets/js/main.js'])
       .pipe(uglify())
       //.pipe(concat('_/js/main.js'))
       .pipe(gulp.dest('assets/js'))
});
gulp.task('jade', function() {
  return gulp.src('_jadefiles/*.jade')
            .pipe(jade())
            .pipe(gulp.dest('_includes'))
});



//watcher task
gulp.task('watch', function() {
   // Watch .scss and sass files
  gulp.watch('assets/css/**',  ['sass']);

  // watch jekyll build...
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], ['jekyll-rebuild']);
   // Watch .js files
  gulp.watch('assets/js/**/*.js', ['scripts']);

  gulp.watch('_jadefiles/*.jade', ['jade']);
 });

// Default tasks
gulp.task('default', ['browser-sync', 'watch']);
