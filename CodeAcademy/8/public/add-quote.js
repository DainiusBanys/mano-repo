const submitButton = document.getElementById("submit-quote");
const newQuoteContainer = document.getElementById("new-quote");
submitButton.addEventListener("click", () => {
  const quote = document.getElementById("quote").value;
  const person = document.getElementById("person").value;

  fetch("/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quote, person }),
  })
    .then((res) => res.json())
    .then(({ quote, person }) => {
      const newQuote = document.createElement("div");
      newQuote.innerHTML = `
      <h3>Congrats, your quote was added!</h3>
      <div class="quote-text">${quote}</div>
      <div class="attribution">- ${person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `;
      newQuoteContainer.appendChild(newQuote);
    })
    .catch((error) => console.error(error));
});