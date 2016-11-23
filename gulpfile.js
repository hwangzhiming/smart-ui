const gulp = require('gulp');
const babel  = require('gulp-babel');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const clean  = require('gulp-clean');
const sass = require('gulp-sass');
const runSequence = require('gulp-run-sequence');


gulp.task('clean', () => {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});
gulp.task('build:es6', ()=> {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:scss', ()=> {
    return gulp.src('./src/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError)) 
        .pipe(sass())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('publish:es6', ['build:es6'], ()=> {
    return gulp.src('./dist/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('publish:scss', ['build:scss'], ()=> {
    return gulp.src('./dist/**/*.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('publish', ()=> {
    return runSequence('clean', 'publish:es6', 'publish:scss');
});

gulp.task('watch',() => {
    return gulp.watch('src/**/*', ['publish']);
});