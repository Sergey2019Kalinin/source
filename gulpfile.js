const gulp = require("gulp");
const minify = require("gulp-minify");

gulp.task('copyHtml', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
})

gulp.task('copyJS', () => {
  return gulp.src('node_modules/handsontable/dist/handsontable.full.min.js')
    .pipe(gulp.dest('build/js'))
})

gulp.task('copyCSS', () => {
  return gulp.src('node_modules/handsontable/dist/handsontable.full.min.css')
    .pipe(gulp.dest('build/css'))
})

gulp.task('minify', () => {
  return gulp.src('src/js/main.js', { allowEmpty: true })
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest('build/js'))
})

gulp.task('default', gulp.series(['copyHtml', 'minify', 'copyJS', 'copyCSS']));