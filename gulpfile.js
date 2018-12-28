const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('sass', function() {
  return gulp.src('assets/styles/sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets/styles/css'));
})

gulp.task('watch', function() {
  gulp.watch('assets/styles/sass/*.scss', gulp.series('sass'));
})

gulp.task('default', gulp.series('watch'));
