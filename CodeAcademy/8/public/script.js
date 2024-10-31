const fetchAllButton = document.getElementById("fetch-quotes");
const fetchRandomButton = document.getElementById("fetch-random");
const fetchByAuthorButton = document.getElementById("fetch-by-author");

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.querySelector(".quote");
const attributionText = document.querySelector(".attribution");
// import { quotes } from "../data";

const resetQuotes = () => {
  quoteContainer.innerHTML = "";
};

let quotes = [];
const renderError = (response) => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
};
console.log("quotes 1 " + quotes.length);
const renderQuotes = (quotes = []) => {
  resetQuotes();
  console.log("quotes 2 " + quotes.length);
  if (quotes.length > 0) {
    quotes.forEach((quote) => {
      const newQuote = document.createElement("div");
      newQuote.className = "single-quote";
      newQuote.innerHTML = `<div class="quote-text"><span>${quote.id}</span>   ${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = "<p>Your request returned no quotes.</p>";
  }
};

fetchAllButton.addEventListener("click", () => {
  fetch("/api/quotes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      console.log(response);
      renderQuotes(response);
    });
});

fetchRandomButton.addEventListener("click", () => {
  fetch("/api/quotes/random")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderQuotes([response]);
    });
});

fetchByAuthorButton.addEventListener("click", () => {
  const author = document.getElementById("author").value;
  fetch(`/api/quotes/author?person=${author}`)
    // fetch(`/api/quotes/:${author}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
        // return response;
      } else {
        renderError(response);
      }
    })
    .then((data) => {
      // console.log("atsakymas kliente " + data);
      renderQuotes(data);
    });
});
