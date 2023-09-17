const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuotesBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = []; 
const spinnerShowLoading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
} 
 
const loadingSpinnerComplete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// SHOW NEW QUOTES
const showNewQuote = () => {
    spinnerShowLoading();
    // pick random quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //  populate to html
    if (!quote.author){
        authorText.textContent = "Unknown";
    }else { 
        authorText.textContent = quote.author;
    }
    // check quotes length to determines styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    } 
    quoteText.textContent = quote.text;
    loadingSpinnerComplete();
}

// GET QUOTES FROM API
const getQuotes = async () => {
    spinnerShowLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch (error) {
        alert(error);
    }
}

// Tweet Quotes
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuotesBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// onload
getQuotes();


