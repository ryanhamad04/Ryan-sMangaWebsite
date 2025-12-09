/* ================================
   BROWSE PAGE FILTERING (ONLY)
================================ */

const browseCards = Array.from(document.querySelectorAll(".browse .book-card"));

// Add listeners for filtering
document.querySelectorAll("#filters input, #filters select").forEach(control => {
  control.addEventListener("input", applyFilters);
});

// Reset button
document.querySelector("#reset-filters").addEventListener("click", () => {
  setTimeout(applyFilters, 10); // Let UI update first
});

function applyFilters() {
  const q = document.querySelector("#q").value.toLowerCase().trim();
  const genre = document.querySelector("#genre").value.toLowerCase();
  const status = document.querySelector("#status").value.toLowerCase();

  let matchCount = 0;

  browseCards.forEach(card => {
    const title = card.dataset.title;
    const author = card.dataset.author;
    const genres = card.dataset.genres;
    const statuses = card.dataset.status;

    const matchesQ =
      !q || title.includes(q) || author.includes(q);

    const matchesGenre =
      !genre || genres.includes(genre);

    const matchesStatus =
      !status || statuses.includes(status);

    const visible = matchesQ && matchesGenre && matchesStatus;

    card.style.display = visible ? "" : "none";

    if (visible) matchCount++;
  });

  document.querySelector("#match-count").textContent = matchCount;
}

// Run once when page loads
window.addEventListener("load", applyFilters);
