var gulp = require('gulp');
// Now that we've installed the uglify package we can require it:
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyError = require('gulp-prettyerror'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    input = './js/script.js',
    output = './js/transpiled';

gulp.task('babel', () => {
  return gulp.src(input)
      .pipe(babel())
      .pipe(gulp.dest(output));
});

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(prettyError()) // Error handling
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});
gulp.task('scripts', ['eslint'], function(){
  gulp.src('./js/transpiled/script.js')
    .pipe(uglify()) // Call uglify function on files
    .pipe(rename({ extname: '.min.js' })) // Rename uglified file
    .pipe(gulp.dest('./build/js')) // Result destination
});
gulp.task('eslint', function() {
  return gulp.src(['./js/transpiled/script.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);
});
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
    gulp.watch(['*.html', 'build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
  });
  gulp.task('default', ['watch', 'browser-sync', 'eslint']);

// // var gulp = require('gulp');
// // gulp.task('default', function() {
// //   // place code for your default task here
// // });

// var gulp = require('gulp'),
//   rename = require('gulp-rename');

// var uglify = require('gulp-uglify'),
//   browserSync = require('browser-sync'),
//   eslint = require('gulp-eslint'),
//   sass = require('gulp-sass'),
//   autoprefixer = require('gulp-autoprefixer'),
//   cssnano = require('gulp-cssnano'),
//   prettyError = require('gulp-prettyerror');


// gulp.task('scripts', ['lint'], function(){
//   gulp.src('./js/*.js')
//   .pipe(prettyError())  
//   .pipe(uglify()) // Call uglify function on these files
//   .pipe(rename({ extname: '.min.js' })) // Rename  uglified file
//   .pipe(gulp.dest('./build/js')) // Where to output
// });

// gulp.task('lint', function(){
// // Return the stream from the task or task may end before stream has finished. 
//   return gulp.src(['./js/*.js','!node_modules/**'])
//   .pipe(eslint())
//   .pipe(eslint.format())
//   .pipe(eslint.failAfterError())
// });

// gulp.task('sass', function() {
//   gulp.src('./sass/style.scss')
//   .pipe(sass())
//   .pipe(autoprefixer({
//         browsers: ['last 2 versions']
//   }))
//   .pipe(gulp.dest('./build/css'))
//   .pipe(cssnano())
//   .pipe(rename('style.min.css'))
//   .pipe(gulp.dest('./build/css'));
// });

// gulp.task('watch', function() {
//   gulp.watch('js/*.js', ['scripts']);
//   gulp.watch('.sass/*.scss',['sass'])
//   });

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     }
//   });
//   gulp.watch(['*.html','build/css/*.css',
//   'build/js/*.js']).on('change', browserSync.reload);
// });      

// gulp.task('default',['watch', 'browser-sync']);
