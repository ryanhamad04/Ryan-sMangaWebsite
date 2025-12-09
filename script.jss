(function() {
    const qInput = document.getElementById('q');
    const genreSel = document.getElementById('genre');
    const statusSel = document.getElementById('status');
    const resetBtn = document.getElementById('reset-filters');
    const countSpan = document.getElementById('match-count');
    const cards = Array.from(document.querySelectorAll('.book-card'));

    function norm(s) {
        return (s || '').toLowerCase().trim();
    }

    function matches(card) {
        const q = norm(qInput?.value);
        const genre = norm(genreSel?.value);
        const status = norm(statusSel?.value);
        const title = (card.dataset.title || '').toLowerCase();
        const author = (card.dataset.author || '').toLowerCase();
        const genres = (card.dataset.genres || '').toLowerCase();
        const statuses = (card.dataset.status || '').toLowerCase();

        const textOK = !q || title.includes(q) || author.includes(q);
        const genreOK = !genre || genres.split(',').map(norm).includes(genre);
        const statusOK = !status || statuses.split(',').map(norm).includes(status);

        return textOK && genreOK && statusOK;
    }

    function applyFilters() {
        let visible = 0;
        cards.forEach(card => {
            if (matches(card)) {
                card.classList.remove('hidden');
                visible++;
            } else {
                card.classList.add('hidden');
            }
        });
        if (countSpan) {
            countSpan.textContent = visible;
        }
    }

    if (qInput) qInput.addEventListener('input', applyFilters);
    if (genreSel) genreSel.addEventListener('change', applyFilters);
    if (statusSel) statusSel.addEventListener('change', applyFilters);

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            setTimeout(applyFilters, 0);
        });
    }

    applyFilters();
})();

window.addEventListener("load", function() {
    const event = new Event("input");
    document.getElementById("q").dispatchEvent(event);
});
