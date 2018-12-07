var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    notify = require('gulp-notify'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    assetRev = require('gulp-asset-rev'),
    copy = require('gulp-copy'),
    clean = require('gulp-clean');

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});
gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(assetRev())
        // https://www.npmjs.com/package/clean-css#important-40-breaking-changes
        .pipe(cleancss({compatibility: 'ie8', rebase: false}))
        .pipe(gulp.dest('dist'));
});
gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        .pipe(assetRev())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('copy', function () {
    return gulp.src(['src/**/**', '!src/**/*.{html,css,js}'])
        .pipe(gulp.dest('dist'));
});
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('default', ['clean', 'copy', 'html', 'css', 'js']);