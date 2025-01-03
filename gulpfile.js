const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// BrowserSync for Development
gulp.task('browserSyncDev', done => {
  browserSync.init({
    server: './',
  });
  done();
});

// Compile SCSS
gulp.task('sass', () => {
  return gulp.src('assets/styles/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/styles/css'))
    .pipe(browserSync.stream());
});

// Watch Files for Changes
gulp.task('default', gulp.series('browserSyncDev', 'sass', () => {
  gulp.watch('assets/styles/scss/*.scss', gulp.series('sass'));
  gulp.watch(['*.html', '**/*.js']).on('change', browserSync.reload);
}));
