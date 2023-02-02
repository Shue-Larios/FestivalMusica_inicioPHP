// crear galeria con JS cuando tenes muchas imagenes

document.addEventListener('DOMContentLoaded', function(){
iniciarApp();
});

function iniciarApp(){
    crearGaleria();
   scrollNav(); //llamamos la funcion para hacer Smooth Scroll 
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach(enlace=>{
        enlace.addEventListener('click',function (e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoview({behavior: "smooth"});
        });
    });
}

// // esta es una api para hacer Smooth Scroll 
// // para que funcione hay que ponerle los href como id unicos
// function scrollNav() {
//     // lo primero que tenemos que hacer es leer los enlaces
//     const enlaces = document.querySelectorAll('.navegacion-principal a');

//     enlaces.forEach( enlace => { // forEach para ir entrando a cada uno de los enlaces
//         enlace.addEventListener('click', function(e) {
//     // aca prevenimos la accion por defecto xk sino nos sigue llevando de un solo golpe al lugar que vamos
//             e.preventDefault();
//             const seccionScroll = e.target.attributes.href.value;
//             const seccion = document.querySelector(seccionScroll); // target es a lo que le hemos dado clic
//     // Attributes es para entrar a los atributos que tenda id clases etc
//     //href aca entramos a ese atributo y value trae el valor d ese atributo
//     // scrollIntoView se llama la api y dentro de { } le puedo pasar un objeto de configuracion
//             seccion.scrollIntoView ({ behavior: 'smooth'});
// });
//     });

// }




function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    //creamor un for para que corra 12 veces que son la cantidad de imagenes nombradas por numero
    for (let i = 1; i <= 12; i++) {
// para crear el elemento picture
        const imagen = document.createElement('picture');
// para mostrar las imagenes sin orden en la pagina 
        imagen.innerHTML = `
        <source srcset="build/img/thumb/ ${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img src="src/img/thumb/${i}.jpg" alt="imagen de la galeria"></img>
        `;
// identificar a que imagen le estamos dando clic
imagen.onclick = function (){
    mostrarImagen(i);
}
        galeria.appendChild(imagen);
    }
}


// funcion para mostrar la imagen grande
function mostrarImagen(id){
    const imagen = document.createElement('picture');
    // para mostrar las imagenes sin orden en la pagina 
            imagen.innerHTML = `
            <source srcset="build/img/grande/ ${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img src="src/img/grande/${id}.jpg" alt="imagen de la galeria"></img>
            `;
// crea el overlay con la imagen
            const overlay = document.createElement('DIV');
            overlay.appendChild(imagen)
            overlay.classList.add('overlay') // para agregarle una clase
// funcion para que cuando le demos a cualquier lado de la imagen grande la cierre
            overlay.onclick = function (){
                overlay.remove();
                body.classList.remove('fijar-body'); // remuevo la clase que le ponemos abajo xk sino aunq cerremos la imagen no deja dar scroll
            }

// boton para cerrar el modal
const cerrarModal = document.createElement('P');
cerrarModal.textContent = "X"; // lo que mostramos para cerrar
cerrarModal.classList.add('btn-cerrar');
    // funcion para cuando yo le de clic a la X lo que va hacer es cerrar el overlay
    cerrarModal.onclick = function (){
        overlay.remove();
        body.classList.remove('fijar-body'); // remuevo la clase que le ponemos abajo xk sino aunq cerremos la imagen no deja dar scroll
    }
overlay.appendChild (cerrarModal); // lo agregamos al overlay para que lo muestre junto a la imagen


            // para mostrar las nuevas imagenes en pantalla añadirlo en el HTML
            const body = document.querySelector('body');
            body.appendChild(overlay);
            body.classList.add('fijar-body'); // para fijar el body y que no se pueda dar scroll
}
 