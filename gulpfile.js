"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    cleanCSS = require("gulp-clean-css"),
    gulpTS = require("gulp-typescript"),
    gulpUglify = require("gulp-uglify"),
    gulpJade = require("gulp-jade"),
    gulpClean = require('gulp-clean'),
    watch = require('gulp-watch');

// Чистим папку
gulp.task('clean', function () {
    return del.sync('public');
});

// Переносим библиотеки
gulp.task('mooveLib', function(){
	gulp.src(['./project/style/*.css', '!./project/style/pokemon*.css'])
	    .pipe(gulp.dest('./public/style')); 
	gulp.src(['./project/script/*.js', "!./project/script/pokemon*.js"])
	    .pipe(gulp.dest('./public/script'));     
    gulp.src(['./project/*.json'])
	    .pipe(gulp.dest('./public/'));
    gulp.src(['./project/image/*'])
        .pipe(gulp.dest('./public/image/'));    
});	


// Собираем html из Jade
gulp.task('jade', function() {
    gulp.src(['./project/views/*/*.jade'])
        .pipe(gulpJade({pretty: true}))  
        .on('error', console.log) 
    .pipe(gulp.dest('./public/views', {overwrite: true})); 

    gulp.src(['./project/index.jade'])
        .pipe(gulpJade({pretty: true}))  
        .on('error', console.log) 
    .pipe(gulp.dest('./public', {overwrite: true})); 
});    

// Собираем JavaScript из TypeScript
gulp.task('typescript', function() {
    gulp.src(['./project/views/*/*.ts'])
        .pipe(gulpTS())  
        .on('error', console.log) 
    .pipe(gulp.dest('./public/views', {overwrite: true}));

    gulp.src(['./project/script/*.ts'])
        .pipe(gulpTS())  
        .on('error', console.log) 
    .pipe(gulp.dest('./public/script', {overwrite: true})); 
});  

// Собираем LESS
gulp.task('less', function() {
    gulp.src(['./project/style/*.less'])
        .pipe(less())  
        .on('error', console.log) 
    .pipe(gulp.dest('./public/style', {overwrite: true})); 
}); 


gulp.task('changeTS', function () {
	gulp.src(['./project/views/*/*.ts'])
        .pipe(gulpTS())  
        .on('error', console.log) 
    .pipe(gulp.dest('./project/views', {overwrite: true}));
});

gulp.task('changeMainTS', function () {
	gulp.src(['./project/script/pokemon.ts'])
        .pipe(gulpTS())  
        .on('error', console.log) 
    .pipe(gulp.dest('./project/script', {overwrite: true}));
});

gulp.task('changeJade', function () {
	gulp.src(['./project/views/*/*.jade'])
        .pipe(gulpJade({pretty: true}))  
        .on('error', console.log) 
    .pipe(gulp.dest('./project/views', {overwrite: true}));
});

gulp.task('changeIndex', function () {
	gulp.src(['./project/index.jade'])
        .pipe(gulpJade({pretty: true}))  
        .on('error', console.log) 
    .pipe(gulp.dest('./project/', {overwrite: true}));
});

gulp.task('changeLess', function () {
	gulp.src(['./project/style/*.less'])
        .pipe(less())  
        .on('error', console.log) 
    .pipe(gulp.dest('./project/style', {overwrite: true}));
});

// компиляция изменений
gulp.task('whatsNew', function(){
	watch('./project/views/*/*.ts', function(event) {  
    	gulp.run('changeTS');
	});
	watch('./project/views/*/*.jade', function(event) {  
    	gulp.run('changeJade');
	});
	watch('./project/style/*.less', function(event) {  
    	gulp.run('changeLess');
	});

	watch('./project/index.jade', function(event) {  
    	gulp.run('changeIndex');
	});

	watch('./project/script/pokemon.ts', function(event) {  
    	gulp.run('changeMainTS');
	});
});

// сборка проекта
gulp.task('build', function() {
    gulp.run('clean');
    gulp.run('mooveLib');
    gulp.run('less');
    gulp.run('jade');
    gulp.run('typescript');
});



