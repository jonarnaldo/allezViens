var gulp = require('gulp'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

var paths = {
  bower : "./client/bower_components/",
  index : "./client/index.html",
  client : "./client/",
  sass: "./client/sass/style.scss"
}

// Compile all .scss files ----> styles.css
gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest(paths.client));
});

// Inject all bower dependencies listed in bower.json ---> index.html
gulp.task('bower', function () {  
  gulp.src(paths.index)
    .pipe(wiredep({
      directory: paths.bower,
      bowerJson: require('./bower.json'),
    }))
    .pipe(gulp.dest(paths.client));
});

gulp.task('watch', function() {
  gulp.watch('./client/sass/*.scss', ['sass']);
});

gulp.task('default', function() {
    gulp.start('sass','bower','watch');
});

