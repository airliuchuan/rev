var gulp = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
var clean = require('gulp-clean')

gulp.task('css', function() {
	return gulp.src('src/css/*.css')
		.pipe(rev())
		.pipe(gulp.dest('dist/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/css'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(rev())
		.pipe(gulp.dest('dist/js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/js'));
});

gulp.task('rev', function() {
	return gulp.src(['rev/**/*.json', 'src/app/*.html'])
		.pipe(revCollector({
			replaceReved: true,//允许替换, 已经被替换过的文件
			dirReplacements: {
				'css': '/dist/css',
				'js': '/dist/js'
			}
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
	return gulp.src(['dist', 'rev'])
		.pipe(clean());
});
gulp.task('build', function(cb) {
	runSequence('clean', ['css', 'js'], 'rev', cb);
});
