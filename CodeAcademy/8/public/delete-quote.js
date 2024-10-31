const submitButton = document.getElementById("submit-quote-del");
const newQuoteContainer = document.getElementById("deleted-quote");
submitButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;
  console.log("id " + id);

  fetch(`/api/quotes/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((index) => {
      const delQuote = document.createElement("div");
      delQuote.innerHTML = `
      <h3>Congrats, your quote ${parseInt(index) + 1} was deleted!</h3>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `;
      newQuoteContainer.appendChild(delQuote);
    });
});
