var gulp = require('gulp'), 
				nodemon = require('gulp-nodemon');

gulp.task('dev:server', function () {
	nodemon({
		script: "./bin/www",
		ext: "", 
		env: {"DEBUG": "app:server"},
		ignore:['ng*', 'gulp*', 'public*', 'sylesheets*', 'test*', 'fonts*']
	});
});

