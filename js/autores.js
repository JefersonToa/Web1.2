document.addEventListener('DOMContentLoaded', () => {
    // Usamos document.getElementById() para seleccionar elementos por su ID.
    // Esto es más específico y demuestra tu control sobre la estructura.
    const paginationNav = document.getElementById('barraNavegacion');
    const authorContainer = document.getElementById('misAutores');

    // Dentro de la navegación de paginación (que ahora obtenemos por ID),
    // seleccionamos todos los enlaces <a> que son las letras.
    const paginationLinks = paginationNav.querySelectorAll('a');
    
    // Dentro del contenedor de autores (que también obtenemos por ID),
    // seleccionamos todos los <div> que son las tarjetas de cada autor.
    const authorCards = authorContainer.querySelectorAll('.flex.items-center.gap-4'); // Seleccionamos las tarjetas por sus clases compartidas

    paginationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace

            const clickedText = event.target.textContent.trim().toUpperCase();

            // Quitamos el estado activo de todos los enlaces de letras
            paginationLinks.forEach(item => {
                // Asegúrate de que solo los enlaces de letras cambien de estilo,
                // no "Adelante" o "Atras" si no quieres que tengan el estilo azul de selección.
                if (item.classList.contains('bg-blue-100')) {
                    item.classList.remove('bg-blue-100', 'text-blue-900');
                    item.classList.add('bg-white', 'text-black-700');
                }
            });

            // Añadimos el estado activo al enlace de letra clickeado
            // Solo si es una letra individual (A-Z)
            if (clickedText.length === 1 && clickedText >= 'A' && clickedText <= 'Z') {
                event.target.classList.remove('bg-white', 'text-black-700');
                event.target.classList.add('bg-blue-100', 'text-blue-900');
            }

            authorCards.forEach(card => {
                // Selecciona el div que contiene el nombre del autor dentro de cada tarjeta
                const authorNameElement = card.querySelector('.font-medium div:first-child');
                if (authorNameElement) {
                    const authorName = authorNameElement.textContent.trim().toUpperCase();
                    
                    if (clickedText === 'ADELANTE' || clickedText === 'ATRAS') {
                        // Si se hace clic en "Adelante" o "Atras", mostramos todos los autores.
                        // También puedes implementar una lógica de paginación real aquí.
                        card.style.display = 'flex';
                    } else if (authorName.startsWith(clickedText)) {
                        card.style.display = 'flex'; // Muestra la tarjeta si el nombre comienza con la letra
                    } else {
                        card.style.display = 'none'; // Oculta la tarjeta si no coincide
                    }
                }
            });
        });
    });
});