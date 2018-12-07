var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    notify = require('gulp-notify'),
    cleancss = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    assetRev = require('gulp-asset-rev');

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(assetRev())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(notify({message: 'HTML文件压缩完毕'}));
});
gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(assetRev())
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message: 'CSS文件压缩完毕'}));
});
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(assetRev())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({message: 'js文件混缩完毕'}));
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean())
        .pipe(notify({message: '删除完毕'}));
});

gulp.task('default', ['clean', 'html', 'css', 'js']);