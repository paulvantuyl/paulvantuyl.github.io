const { series, gulp } = require('gulp');
const dependencies = require('gulp-web-dependencies');
const $ = require('gulp-load-plugins');
const path_dest = 'js/vendor';
const sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function sass(cb) {
	return gulp.src(['scss/app.scss'])
    .pipe($.sass({
    		includePaths: sassPaths,
    		outputStyle: 'compressed'
    	}))
    	.on('error', $.sass.logError)
    .pipe($.autoprefixer({
    		browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
	cb();
};

function dependents(cb) {
  return gulp.src([
    'node_modules/foundation-sites/dist/js/foundation.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/what-input/dist/what-input.min.js'
	])
		.pipe(dependencies({
			dest: path_dest,
			prefix: '/vendor',
		}))
		.pipe(gulp.dest(path_dest));
  cb();
};

exports.default = series(sass, dependents);
