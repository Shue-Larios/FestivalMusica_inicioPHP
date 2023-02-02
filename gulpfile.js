const { src, dest, watch, parallel } = require ('gulp');

//css
const sass = require ('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
// estos ultimos 3 ayudan a mejorar el codigo css
const autoprefixer = require ('autoprefixer'); // se asegura que el codigo funcione en cualquier navegador
const cssnano = require ('cssnano'); // comprime nuestro codigo css
const postcss = require ('gulp-postcss'); // hace unas tranformaciones por medio de los dos anteriores
const sourcemaps = require ('gulp-sourcemaps');

// imagenes
const cache = require ('gulp-cache');
const imagenmin = require ('gulp-imagemin');
const webp = require ('gulp-webp');
const avif = require ('gulp-avif');

//JavaScript
//Terser sirve para mejorar el codigo de javascript
const terser = require('gulp-terser-js');


function css (done){
// Idetificar el archivo .SCSS a compilar
src('src/scss/**/*.scss')
    .pipe(sourcemaps.init()) // para guardar la referencia y saber donde esta la ubicacion para hacer alguna modificacion del codigo css
    .pipe(plumber()) // sirve para no detener el wordflout pero siempre muestra el error
    //Compilarlo
    .pipe(sass () )
    .pipe( postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.')) // para saber donde se va a guardar
    //Almacenarlo
    .pipe(dest('build/css'))
    done()// indica a gulp que ya termino la funcion
}

function imagenes (done){
    const opciones = {
       optimizationLevel : 3
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagenmin(opciones)))
    .pipe(dest('build/img'))
    done();

}
// para hacer imagenes webp y guardarlas
function versionWebp (done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')// lugar de donde sacamos las imagenes
        .pipe(webp(opciones))
        .pipe(dest('build/img')) // lugar donde se va a guardar
    done();
}
// para hacer imagenes con AVif
function versionAvif (done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')// lugar de donde sacamos las imagenes
        .pipe(avif(opciones))
        .pipe(dest('build/img')) // lugar donde se va a guardar
    done();
}

function javascript( done){
src('src/js/**/*.js')// ubicacion del archivo Javascript
.pipe(sourcemaps.init()) // para inicializar y poder hacer un cambio al codigo fuente
.pipe(terser())  // para minificar el codigo javascrpt
.pipe(sourcemaps.write('.')) // para saber donde se va a guardar
.pipe(dest('build/js')) // lugar donde se va a guardar
    done() // le decimos que termina
}


function dev (done){
 // escucha que archivos va a star ejecutando y actualiza por las modificaciones
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript) 
    done()
}

// por si los queremos llamar por separado
exports.tarea = css;
exports.js = javascript;
exports.imagenes = imagenes
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
// por si los queremos llamar en conjunto
//exports.dev = parallel (imagenes,versionWebp,versionAvif,javascript, dev);
exports.dev = dev;