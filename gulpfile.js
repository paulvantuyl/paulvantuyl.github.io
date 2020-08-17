'use strict';

const { gulp, series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const css_path = 'css/';
const js_path = 'js/vendor/';
const autoprefixer = require('gulp-autoprefixer');
var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

sass.compiler = require('node-sass');

function transpile(cb) {
	return src(['scss/app.scss'])
    .pipe(sass({
    		includePaths: sassPaths,
    		outputStyle: 'compressed'
    	}))
    .on('error', sass.logError)
    .pipe(autoprefixer({
      dest: css_path,
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(dest(css_path));
	cb();
};

function bundle(cb) {
  return src([
    'node_modules/foundation-sites/dist/js/foundation.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/what-input/dist/what-input.min.js'
	])
		.pipe(dest(js_path));
  cb();
};

exports.transpile = transpile;
exports.bundle = bundle;
exports.default = series(transpile, bundle);
