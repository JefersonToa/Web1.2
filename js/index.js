let cajaContenedor = document.querySelector('.contenedor');
let cajaContenedor2 = document.querySelector('.contenedor2');
let cajaContenedor3 = document.querySelector('.contenedor3');
let cajaCont = document.querySelector('.cont');
let cajaCont1 = document.querySelector('.cont1');
const cambiarBG=()=>{
    cajaContenedor.style.backgroundColor = 'lightgray';  
} 
  const cambiarBGDos=()=>{
    cajaContenedor.style.backgroundColor = 'white'; 
} 
 
const cambiarBG2 = () => {
    cajaContenedor2.style.backgroundColor = 'lightgray';
}
const cambiarBGDos2 = () => {
    cajaContenedor2.style.backgroundColor = 'white';
}

const cambiarBG3 = () => {
    cajaContenedor3.style.backgroundColor = 'lightgray';
}
const cambiarBGDos3 = () => {
    cajaContenedor3.style.backgroundColor = 'white';
}

const cambia  = () => {
    cajaCont.style.backgroundColor = 'lightgray';
}
const cambiar = () => {
    cajaCont.style.backgroundColor = 'white';
}
const cambia1  = () => {
    cajaCont1.style.backgroundColor = 'lightgray';
}
const cambiar2 = () => {
    cajaCont1.style.backgroundColor = 'white';
}


  cajaContenedor.onmousemove = cambiarBG;
  cajaContenedor.onmouseout = cambiarBGDos;

  cajaContenedor2.onmousemove = cambiarBG2;
  cajaContenedor2.onmouseout = cambiarBGDos2;

  cajaContenedor3.onmousemove = cambiarBG3;
  cajaContenedor3.onmouseout = cambiarBGDos3;

  cajaCont.onmousemove = cambia;
  cajaCont.onmouseout = cambiar;
 
  cajaCont1.onmousemove = cambia1;
  cajaCont1.onmouseout = cambiar2;



let libro1 = document.querySelector('#img1');
let libro2 = document.querySelector('#img2');
    const img1 = () => {
        libro1.src = '../../imagenes/libro1.1.jpg';
    }
    const img2 = () => {
        libro1.src = '../../imagenes/libro1.jpg';
    }

    const img3 = () => { 
        libro2.src = '../../imagenes/libro2.2.jpg'; }
    const img4 = () => { 
        libro2.src = '../../imagenes/libro2.jpg'; }


    libro1.onmouseover = img1;
    libro1.onmouseout = img2;

    libro2.onmouseover = img3;
    libro2.onmouseout = img4;
