'use strict';
/**
 * 1.	LESS编译		压缩		合并
 * 2.	js	合并		压缩		混淆
 * 3.	images复制
 * 4.	html	压缩
 */

/**
 * gulp 包的载入
 */
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');

/**
 * LESS	编译	压缩	合并
 */
gulp.task('less',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
		stream:true
	}));
});

/**
 * js合并 压缩 混淆
 */
gulp.task('script',function(){
	gulp.src('src/script/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({
		stream:true
	}));
});

/**
 * 图片复制
 */

gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}));
});

/**
 * html
 */

gulp.task('html',function(){
	
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true,removeComments:true,removeAttributeQuotes:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream:true
	}));
});

var browserSync = require('browser-sync');

// Static server
gulp.task('server', function() {
    browserSync({
    	server: {
            baseDir: ['dist']
        }}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
	});
    gulp.watch('src/styles/*.less',['less']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});