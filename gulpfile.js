const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const del = require('del');


gulp.task('browserSyncDev', done => {
  browserSync.init({
    server: './',
  });
  done();
});

gulp.task('sassDev', () => {
  return gulp.src('assets/styles/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // .pipe(rename({ suffix: '.min' })) // TODO: Uncomment when compression works
    .pipe(gulp.dest('assets/styles/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', () => {
  return gulp.src('assets/styles/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // .pipe(rename({ suffix: '.min' })) // TODO: Uncomment when compression works
    .pipe(gulp.dest('dist/styles/css'))
});

gulp.task('sassMap', () => {
  return gulp.src('assets/styles/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/css'))
});

gulp.task('js', () => {
  return gulp.src('assets/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', () => {
  return gulp.src('assets/images/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true,
  })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('doc', () => {
  return gulp.src('assets/doc/*.pdf')
    .pipe(gulp.dest('dist/doc'))
});

gulp.task('clean:dist', () => del.sync('dist'));

gulp.task('cache:clear', callback => cache.clearAll(callback));


// Run for file watch fix:
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
gulp.task('default', gulp.series('browserSyncDev', 'sassDev', () => {
  gulp.watch('assets/styles/scss/*.scss', gulp.series('sass'));
  gulp.watch(['*.html', '**/*.js']).on('change', browserSync.reload);
}));

// gulp.task('build', gulp.parallel(gulp.series('clean', 'html', 'sass', 'sassMap', 'js', 'images', 'doc'), function (){
//   console.log('Building files');
// }));
