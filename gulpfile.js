const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const minifyCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
 

function taskIMAGES(cb) {
//Kopierar och flyttar över bilder
(async () => {
    const filesImages = await imagemin(['src/**/*.{jpg,png}'], {
        destination: 'pub/images',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    cb();
})();
}


//Sökvägar 
const files = { 
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    sassPath: "src/**/style.scss",
    imagePath: "src/**/*.{jpg, png}"
}

//Lägger över html-filerna
function taskHTML() { 
    //Här är filerna
    return src(files.htmlPath)
        //Här ska filerna sparas
        .pipe(dest('pub')) 
        .pipe(browserSync.stream()); 
}

//Sass -> css, samt slår ihop filer och minimerar
function taskSASS() {
    return src(files.sassPath)

        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest('pub/css'))
        .pipe(browserSync.stream()); 
}

//Slår ihop och minimerar JS-filer
function taskJS() {
    return src(files.jsPath)

        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('pub/js'))
        .pipe(browserSync.stream());
}


//Kollar om något ändras
function taskWATCH() {
    
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });

    //Vad man lyssnar efter
    watch([files.htmlPath, files.jsPath, files.sassPath, files.imagePath],
        //Vad som ska göras när den känner av något
        parallel(taskHTML, taskJS, taskSASS, taskIMAGES));
   
}

//Körs från start
exports.default = series(
    parallel(taskHTML, taskJS, taskSASS), taskIMAGES,
    taskWATCH
);