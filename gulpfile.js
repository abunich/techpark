var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    concat      = require('gulp-concat'), 
    uglify      = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer'),
    ssasGlob = require('gulp-sass-glob'),
    watch = require('gulp-watch');

gulp.task('sass', function(){
    return gulp.src('app/scss/main.scss')
        .pipe(sass({indentedSyntax: true}))
        .pipe(autoprefixer(['last 15 versions','> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('clean', function() {
    return del.sync('dist');
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    })
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
    setTimeout(function() {
        gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/js/**/*.js', browserSync.reload);
    }, 1000);
});

gulp.task('build', ['clean','sass', 'scripts'], function() {
    var buildCss = gulp.src([ 
        'app/css/main.css',
        ])
    .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

    var buildImg = gulp.src('app/img/**/*.png')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['watch']);

