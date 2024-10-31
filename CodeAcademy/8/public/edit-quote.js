const submitButton = document.getElementById("submit-quote-upd");
const newQuoteContainer = document.getElementById("updated-quote");
submitButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;
  const quote = document.getElementById("quote").value;
  const person = document.getElementById("person").value;
  console.log("id " + id);
  console.log("quote " + quote);
  console.log("person " + person);

  fetch(`/api/quotes/?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, quote, person }),
  })
    // .then((data) => console.log(data))
    .then((res) => res.json())
    .then(({ id, quote, person }) => {
      const newQuote = document.createElement("div");
      newQuote.innerHTML = `
      <h3>Congrats, your quote ${id} was updated!</h3>
      <div class="quote-text">${quote}</div>
      <div class="attribution">- ${person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `;
      newQuoteContainer.appendChild(newQuote);
    })
    .catch((error) => console.error(error));
});
