const { series, src, dest } = require('gulp');

var sass = require('gulp-sass')(require('sass'));

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const css_path = 'css/';
const js_path = 'js/vendor/';

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function transpile(cb) {
	return src(['scss/app.scss'])
    .pipe(sass({
    		includePaths: sassPaths,
    		outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(postcss([
      autoprefixer({
        dest: css_path,
      })
    ]))
    .pipe(dest(css_path));
	cb();
};

function bundle(cb) {
  return src([
    'node_modules/foundation-sites/dist/js/foundation.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    // 'node_modules/what-input/dist/what-input.min.js'
	])
	.pipe(dest(js_path));
  cb();
};

exports.transpile = transpile;
exports.bundle = bundle;
exports.default = series(transpile, bundle);
