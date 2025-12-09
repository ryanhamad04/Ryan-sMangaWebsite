(function () {

  const qInput = document.getElementById("q");
  const genreSel = document.getElementById("genre");
  const statusSel = document.getElementById("status");
  const resetBtn = document.getElementById("reset-filters");
  const countSpan = document.getElementById("match-count");
  const cards = Array.from(document.querySelectorAll(".book-card"));

  function norm(s) {
    return (s || "").toLowerCase().trim();
  }

  // Check if a card matches ALL filters
  function matches(card) {

    const q = norm(qInput?.value);
    const genre = norm(genreSel?.value);
    const status = norm(statusSel?.value);

    const title = norm(card.dataset.title);
    const author = norm(card.dataset.author);

    // MULTIPLE GENRES SUPPORT
    const genreValues = (card.dataset.genres || "")
      .toLowerCase()
      .split(",")
      .map(norm);

    // MULTIPLE STATUS SUPPORT
    const statusValues = (card.dataset.status || "")
      .toLowerCase()
      .split(",")
      .map(norm);

    const textOK = !q || title.includes(q) || author.includes(q);
    const genreOK = !genre || genreValues.includes(genre);
    const statusOK = !status || statusValues.includes(status);

    return textOK && genreOK && statusOK;
  }

  function applyFilters() {
    let visible = 0;

    cards.forEach(card => {
      if (matches(card)) {
        card.style.display = "";
        card.classList.remove("hidden");
        visible++;
      } else {
        card.style.display = "none";
        card.classList.add("hidden");
      }
    });

    if (countSpan) countSpan.textContent = visible;
  }

  // Event Listeners
  if (qInput) qInput.addEventListener("input", applyFilters);
  if (genreSel) genreSel.addEventListener("change", applyFilters);
  if (statusSel) statusSel.addEventListener("change", applyFilters);

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      setTimeout(applyFilters, 0);
    });
  }

  // Run once on load
  applyFilters();

})();
