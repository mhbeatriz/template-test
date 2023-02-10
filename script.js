const quoteContainer = document.getElementById("quote-generator");
const quoteText = document.querySelector(".quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//Show New Quote
let apiQuotes = [];
function newQuote() {
  showLoading();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check quote length to determinate styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote, hide loader
  authorText.textContent = quote.author;
  removeLoading();
}

// GET QUOTES FROM API
async function getQuotes() {
  showLoading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
  }
}

//Tweet Quote

function tweetQuote() {
  loading();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
  removeLoading();
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
