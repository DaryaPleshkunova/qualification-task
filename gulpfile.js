const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const clear = () => {
  return del(['dist'])
}

const styles = () => {
  return src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      cascade: true,
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const stylesBuild = () => {
  return src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(dest('dist'))
}

const pugCompile = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlBuild = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/**/*.png',
  ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

const fonts = () => {
  return src([
    'src/fonts/**/*.woff2',
    'src/fonts/**/*.woff',
  ])
    .pipe(dest('dist/fonts'))
}

const scripts = () => {
  return src([
    'src/script/**/*.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('script.js'))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}


const scriptsBuild = () => {
  return src('src/script/**/*.js')
  .pipe(concat('script.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('dist'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.pug', pugCompile)
watch('src/styles/**/*.scss', styles)
watch('src/script/**/*.js', scripts)

exports.styles = styles;
exports.scripts = scripts;

// dev версия
exports.default = series(clear, pugCompile, styles, scripts, images, fonts, watchFiles);
//build версия
exports.build = series(clear, htmlBuild, stylesBuild, scriptsBuild, images, fonts);