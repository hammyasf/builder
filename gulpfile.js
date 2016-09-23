var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var koutoSwiss = require('kouto-swiss');
var rupture = require('rupture');
var postcss = require('gulp-postcss');
// POST CSS PLUGINS
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var rucksack = require('rucksack-css');
var mqpack = require('css-mqpacker');
var cssnano = require("cssnano");

/**
 * Takes error and emit it preventing gulp watch to stop everytime we have an error.
 */
function swallowError(e) {
	console.log(e.toString());
	this.emit('end');
}

gulp.task('default',['styles']);

gulp.task('styles', function() {

	var processors = [
		lost({}),
		rucksack({}),
		mqpack({
			sort: true
		}),
		cssnano({}),
		autoprefixer({browsers: ['last 1 version']}),
	];

    gulp.src('stylus/style.styl')
      .pipe(stylus({
      	'use': [koutoSwiss(), rupture()]
      }))
      .on('error', swallowError)
      .pipe(postcss(processors))
      .on('error', swallowError)
      .pipe(gulp.dest('bin/css'))
      .pipe(notify('Styles Compiled!'));
});

gulp.task('watch', function() {
    gulp.watch('stylus/**/*.styl', ['styles']);
});