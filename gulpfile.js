const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('browserSync', done => {
  browserSync.init({
    server: './',
  });
  done();
});

gulp.task('sass', () => {
  return gulp.src('assets/styles/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/styles/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('sass', 'browserSync', () => {
  gulp.watch('assets/styles/sass/*.scss', gulp.series('sass'));
  gulp.watch(['*.html', '**/*.js']).on('change', browserSync.reload);
}));

// Run for file watch fix:
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
