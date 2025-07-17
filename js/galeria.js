document.addEventListener('DOMContentLoaded', () => {
  const campoBusqueda = document.getElementById('busqueda-imagenes');
  const imagenes = document.querySelectorAll('.imagen-galeria');
  const mensajeNoEncontrado = document.getElementById('mensaje-no-encontrado');

  const filtrarImagenes = () => {
    const filtro = campoBusqueda.value.trim().toLowerCase();
    let hayCoincidencias = false;

    imagenes.forEach(div => {
      const altTexto = div.querySelector('img').alt.toLowerCase();
      const coincide = altTexto.includes(filtro);

      div.classList.toggle('hidden', !coincide);
      if (coincide) hayCoincidencias = true;
    });

    mensajeNoEncontrado.classList.toggle('hidden', hayCoincidencias);
  };

  campoBusqueda.addEventListener('input', filtrarImagenes);
});

