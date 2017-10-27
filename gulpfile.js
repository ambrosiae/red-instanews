// var gulp = require('gulp');

// gulp.task('default', function() {
//   // place code for your default task here
// });

var gulp = require('gulp'),
  rename = require('gulp-rename');

var uglify = require('gulp-uglify'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror');

gulp.task('default',['watch', 'browser-sync']);

gulp.task('scripts', ['lint'], function(){
  gulp.src('./js/*.js') // Files types gulp shoul
  .pipe(uglify()) // Call uglify function on these files
  .pipe(rename({ extname: '.min.js' })) // Rename  uglified file
  .pipe(gulp.dest('./build/js')) // Where to output
});

gulp.task('lint', function(){
// Return the stream from the task or task may end before stream has finished. 
  return gulp.src(['./js/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

gulp.task('sass', function() {
  gulp.src('./sass/style.scss')
  .pipe(prettyError())
  .pipe(sass())
  .pipe(autoprefixer({
        browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest('./build/css'))
  .pipe(cssnano())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('.sass/*.scss',['sass'])
  });

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['*.html','build/css/*.min.css',
  'build/js/*.js']).on('change', browserSync.reload);
});      


