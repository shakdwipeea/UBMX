/**
 * Created by akash on 22/7/15.
 */

var gulp = require('gulp');
var child = require('child_process');
var util = require('gulp-util');
var notifier = require('node-notifier');
var reload = require('gulp-livereload');
var sync = require('gulp-sync')(gulp).sync;
var server = null;
var GulpSSH = require('gulp-ssh');
var fs = require('fs');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var jsHint = require('gulp-jshint');
var stylish = require('jshint-stylish');


/*
 * Restart application server.
 */
gulp.task('server:spawn', function () {

    if (!browserSync.active) {
        console.log('Browser sync activated');
        browserSync.init({
            notify: false,
            open: false,
            port: 4000,
            proxy: 'http://localhost:3000'
        });
    }
});

/* ----------------------------------------------------------------------------
 * Interface
 * ------------------------------------------------------------------------- */

/*
 * Build assets and application server.
 */
gulp.task('build', [
    'admin-build'
]);

/*
 * Start asset and server watchdogs and initialize livereload.
 */
// gulp.task('watch', [
// ], function() {
//     reload.listen();
//     return gulp.start([
//         'server:watch',
//         'server:spawn'
//     ]);
// });

gulp.task('reload', ['admin-build'], function () {

    notifier.notify({
        title: 'client refreshed',
        message: 'Hah i'
    })
});

gulp.task('client', function () {
    if (!browserSync.active) {
        notifier.notify({
            title: 'client refreshed',
            message: 'Error browser sync not active'
        });
    }
    gulp.watch(['public/src/**/*.js', 'public/src/*.html', 'public/src/**/*.tpl'], ['admin-build', browserSync.reload]);
    console.log('serving on port 8000');
});


gulp.task('admin-build', function () {
    return gulp.src(['public/src/app.js', 'public/src/**/*.js'])
        .pipe(concat('admin.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/'));

});

/*
 * Build assets by default.
 */
gulp.task('default', ['build', 'client', 'server:spawn']);
