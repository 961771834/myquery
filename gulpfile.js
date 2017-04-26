var gulp = require("gulp");
var concat = require("gulp-concat");



gulp.task("unit", function() {
	gulp.src([
			'./myjquery/myjquery-core.js',
			'./myjquery/myjquery-cort.js',
			'./myjquery/myjquery-dom.js',
			'./myjquery/myjquery-event.js',
			'./myjquery/myjquery-attr.js',
			'./myjquery/myjquery-style.js',
		])
		.pipe(concat("./my.js"))
		.pipe(gulp.dest('./dist'))
});

var press = require('gulp-uglify');

gulp.task('yasuo', function() {

	gulp.src('./xb/my.js')
		.pipe(press().on("error", function(e) {
			console.log(e);
		}))
		.pipe(gulp.dest('./output'));
});