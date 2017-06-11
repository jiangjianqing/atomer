const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
//watch有两种模式 strem 和 callback ，目前使用stream
gulp.task('stream', function () {
  // Endless stream mode
  return watch('src/**/*.js', { ignoreInitial: false , verbose: true})
	  .pipe(babel())
	  .pipe(gulp.dest('.'));
});

gulp.task('callback', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return watch('css/**/*.css', function () {
	gulp.src('css/**/*.css')
		.pipe(gulp.dest('build'));
  });
});

gulp.task('watch', ["stream"]);