var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var koutoSwiss = require('kouto-swiss');
var postcss = require('gulp-postcss');
// POST CSS PLUGINS
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var rucksack = require('rucksack-css');
var mqpack = require('css-mqpacker');
var cssnano = require("cssnano");

gulp.task("default", function() {
	//Some Stuff here
});

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
      	'use': koutoSwiss()
      }))
      .pipe(postcss(processors))
      .pipe(gulp.dest('css'))
      .pipe(notify('Styles Compiled!'));
});

gulp.task('watch', function() {
    // content
});