function applyFilters() {
  const q = qInput?.value.trim().toLowerCase() || "";
  const genre = genreSelect?.value.toLowerCase() || "";
  const status = statusSelect?.value.toLowerCase() || "";

  let count = 0;

  bookCards.forEach(book => {
    const title = book.dataset.title.toLowerCase();
    const author = book.dataset.author.toLowerCase();

    // MULTIPLE GENRES SUPPORT
    const genreValues = book.dataset.genres.toLowerCase().split(",");
    const matchesGenre = !genre || genreValues.includes(genre);

    // MULTIPLE STATUS SUPPORT
    const statusValues = book.dataset.status.toLowerCase().split(",");
    const matchesStatus = !status || statusValues.includes(status);

    const matchesSearch =
      !q ||
      title.includes(q) ||
      author.includes(q);

    const shouldShow = matchesSearch && matchesGenre && matchesStatus;

    book.style.display = shouldShow ? "" : "none";

    if (shouldShow) count++;
  });

  matchCount.textContent = count;
}
