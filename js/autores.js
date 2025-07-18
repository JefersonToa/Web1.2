document.addEventListener('DOMContentLoaded', () => {
    const paginationNav = document.getElementById('barraNavegacion');
    const authorContainer = document.getElementById('misAutores');
    const paginationLinks = paginationNav.querySelectorAll('a');
    const authorCards = authorContainer.querySelectorAll('.flex.items-center.gap-4'); 

    paginationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 

            const clickedText = event.target.textContent.trim().toUpperCase();
            paginationLinks.forEach(item => {
                if (item.classList.contains('bg-blue-100')) {
                    item.classList.remove('bg-blue-100', 'text-blue-900');
                    item.classList.add('bg-white', 'text-black-700');
                }
            });

            if (clickedText.length === 1 && clickedText >= 'A' && clickedText <= 'Z') {
                event.target.classList.remove('bg-white', 'text-black-700');
                event.target.classList.add('bg-blue-100', 'text-blue-900');
            }

            authorCards.forEach(card => {
                const authorNameElement = card.querySelector('.font-medium div:first-child');
                if (authorNameElement) {
                    const authorName = authorNameElement.textContent.trim().toUpperCase();   
                    if (clickedText === 'ADELANTE' || clickedText === 'ATRAS') {
                        card.style.display = 'flex';
                    } else if (authorName.startsWith(clickedText)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none'; 
                    }
                }
            });
        });
    });
});