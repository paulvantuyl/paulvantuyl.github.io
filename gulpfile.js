var gulp = require('gulp')
	 , dependencies = require('gulp-web-dependencies');
var path_dest = 'dist';
var $    = require('gulp-load-plugins')();
var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
	return gulp
		.src([
			'node_modules/foundation-sites/dist/js/foundation.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/what-input/dist/what-input.min.js'
		], { base: 'node_modules' })
		.pipe(gulp.dest('js/'));
});

gulp.task('dependencies', function() {
	return gulp.src('src/index.html')
		.pipe(dependencies({
			dest: path_dest,    // The basedir of your application. default: path.dirname(file.path)
			prefix: '/vendor',  // The URL prefix. Default "/"
		}))
		.pipe(gulp.dest(path_dest));
});

gulp.task('default', ['sass'], function() {
	gulp.watch(['scss/**/*.scss'], ['sass']);
	gulp.watch(['js/**/*.js'], ['js']);
})
