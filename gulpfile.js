const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function style() {
	return gulp
		.src('./assets/scss/**/*.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(
			autoprefixer({
				cascade: false,
			}),
		)
		.pipe(gulp.dest('./assets/css/'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	gulp.watch('./assets/scss/**/*.scss', style);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./assets/js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
