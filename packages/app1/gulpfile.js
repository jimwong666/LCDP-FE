const gulp = require('gulp');
const less = require('gulp-less');
const clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src('./public/style', { read: false }).pipe(clean());
});

gulp.task('less', function () {
	return gulp.src('./less/**/*.less').pipe(less()).pipe(gulp.dest('./public/style'));
});

gulp.task('watch', function () {
	gulp.watch('./less/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('clean', 'less', 'watch'));
