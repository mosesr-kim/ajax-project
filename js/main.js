/* exported data */
var $search = document.querySelector('.searchForm');
var $main = document.querySelector('main');
var $searchContainer = document.querySelector('.searchContainer');
var $watchlistEntries = document.querySelector('.watchlistEntries');
var $watchlistButton = document.querySelector('.watchlist');
var $noStocks = document.querySelector('.noStocks');

$search.addEventListener('submit', handleSearch);
$main.addEventListener('click', handleAddStock);
$watchlistButton.addEventListener('click', handleWatchlist);

function handleSearch(event) {
  event.preventDefault();
  $searchContainer.className = 'view searchContainer';
  data.search = $search.elements.search.value;
  console.log($search.elements.search.value);
  if ($search.elements.search.value.toUpperCase() === 'GME') {
    data.searchResult = gmeSearch;
    console.log(gmeSearch);
    createStockEntry(gmeSearch);
    $search.reset();
  } else if ($search.elements.search.value.toUpperCase() === 'AMC') {
    data.searchResult = amcSearch;
    console.log(amcSearch);
    createStockEntry(amcSearch);
    $search.reset();
  } else if ($search.elements.search.value.toUpperCase() === 'BB') {
    data.searchResult = bbSearch;
    console.log(bbSearch);
    createStockEntry(bbSearch);
    $search.reset();
  } else if ($search.elements.search.value.toUpperCase() === 'NOK') {
    data.searchResult = nokSearch;
    console.log(nokSearch);
    createStockEntry(nokSearch);
    $search.reset();
  } else if ($search.elements.search.value.toUpperCase() === 'TSLA') {
    data.searchResult = tslaSearch;
    console.log(tslaSearch);
    createStockEntry(tslaSearch);
    $search.reset();
  } else if ($search.elements.search.value.toUpperCase() === 'GOOGL') {
    data.searchResult = googlSearch;
    console.log(googlSearch);
    createStockEntry(googlSearch);
    $search.reset();
  } else {
    $search.reset();

  }
  // $search.reset();
  // (Code below is commented out to avoid rate limiting restrictions)
  // Gets the stock ticker symbol from the form and runs the searchRequest function which requests data from the api.
  // data.search = $search.elements.search.value;
  // searchRequest(data.search);
}

// (Code below is commented out to avoid rate limiting restrictions)
// The function to request Stock/V2/Get-Profile of a certain stock ticker symbol.
// function searchRequest(search) {
//   var xhr = new XMLHttpRequest();
//   xhr.addEventListener('load', function () {
//     console.log(this.status);
//     console.log(this.response);
//     data.searchResult = this.response;
//   });
//   xhr.open('GET', 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile?symbol=' + search + '&region=US');
//   xhr.responseType = 'json';
//   xhr.setRequestHeader('x-rapidapi-key', '869820100bmsh7cc30b317c45153p1f792fjsn21c1cc0536d7');
//   xhr.setRequestHeader('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com');
//   xhr.send();
// }

// (Code below is commented out to avoid rate limiting restrictions)
// The function to request market/get-trending-tickers
// function trendingRequest() {
//   var xhr = new XMLHttpRequest();
//   xhr.addEventListener('load', function () {
//     console.log(this.status);
//     console.log(this.response);
//     data.trending = this.response;
//   });
//   xhr.open('GET', 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=US');
//   xhr.responseType = 'json';
//   xhr.setRequestHeader('x-rapidapi-key', '869820100bmsh7cc30b317c45153p1f792fjsn21c1cc0536d7');
//   xhr.setRequestHeader('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com');
//   xhr.send();
// }

function createStockEntry(data) {
  removeSearchEntry();

  var searchContainerResult = document.createElement('div');
  searchContainerResult.className = 'row searchContainerResult';
  $searchContainer.appendChild(searchContainerResult);

  var headerRow = document.createElement('div');
  headerRow.className = 'row headerRow';
  searchContainerResult.appendChild(headerRow);

  var stockName = document.createElement('h1');
  stockName.className = 'stockName';
  stockName.textContent = data.price.longName;
  headerRow.appendChild(stockName);

  var stockSymbol = document.createElement('h1');
  stockSymbol.className = 'stockSymbol';
  stockSymbol.textContent = data.price.symbol;
  headerRow.appendChild(stockSymbol);

  var stockPrice = document.createElement('h1');
  headerRow.appendChild(stockPrice);

  var stockPriceSpan = document.createElement('span');
  stockPriceSpan.className = 'stockPrice positive';
  stockPriceSpan.textContent = '$' + data.price.regularMarketPrice.fmt;
  stockPrice.appendChild(stockPriceSpan);

  var subHeaderRow = document.createElement('div');
  subHeaderRow.className = 'row subHeaderRow';
  searchContainerResult.appendChild(subHeaderRow);

  var todayPercentage = document.createElement('h2');
  todayPercentage.textContent = 'Today: ';
  subHeaderRow.appendChild(todayPercentage);

  var todayPercentageSpan = document.createElement('span');
  if (checkPercentage(data.price.regularMarketChangePercent.raw) === true) {
    todayPercentageSpan.className = 'stockToday positive';
  } else {
    todayPercentageSpan.className = 'stockToday negative';
  }
  todayPercentageSpan.textContent = data.price.regularMarketChangePercent.fmt;
  todayPercentage.appendChild(todayPercentageSpan);

  var todayLow = document.createElement('h2');
  todayLow.className = 'todayLow';
  todayLow.textContent = 'Low: ';
  subHeaderRow.appendChild(todayLow);

  var todayLowSpan = document.createElement('span');
  todayLowSpan.className = 'negative';
  todayLowSpan.textContent = '$' + data.price.regularMarketDayLow.fmt;
  todayLow.appendChild(todayLowSpan);

  var todayHigh = document.createElement('h2');
  todayHigh.className = 'todayHigh';
  todayHigh.textContent = 'High: ';
  subHeaderRow.appendChild(todayHigh);

  var todayHighSpan = document.createElement('span');
  todayHighSpan.className = 'positive';
  todayHighSpan.textContent = '$' + data.price.regularMarketDayHigh.fmt;
  todayHigh.appendChild(todayHighSpan);

  var companySummary = document.createElement('p');
  companySummary.className = 'companySummary';
  companySummary.textContent = firstHalf(data.assetProfile.longBusinessSummary);
  searchContainerResult.appendChild(companySummary);

  var dots = document.createElement('span');
  dots.className = 'dots';
  dots.textContent = '...';
  companySummary.appendChild(dots);

  var more = document.createElement('span');
  more.className = 'more hidden';
  more.textContent = secondHalf(data.assetProfile.longBusinessSummary);
  companySummary.appendChild(more);

  var buttonRow = document.createElement('div');
  buttonRow.className = 'buttonRow';
  searchContainerResult.appendChild(buttonRow);

  var readMoreButton = document.createElement('a');
  readMoreButton.className = 'readMore';
  readMoreButton.setAttribute('href', '#');
  readMoreButton.setAttribute('onclick', 'readMore()');
  readMoreButton.textContent = 'Read More';
  buttonRow.appendChild(readMoreButton);

  var addStock = document.createElement('i');
  addStock.className = 'fas fa-plus-circle';
  buttonRow.appendChild(addStock);
}

function firstHalf(summary) {
  var newString = '';
  for (var i = 0; i < (summary.length / 2); i++) {
    newString += summary[i];
  }
  return newString;
}

function secondHalf(summary) {
  var newString = '';
  for (var i = summary.length / 2; i < summary.length; i++) {
    newString += summary[i];
  }
  return newString;
}

function checkPercentage(percentage) {
  return percentage > 0;
}

function handleAddStock(event) {
  if (event.target.className.includes('fa-plus-circle')) {
    data.view = 'watchlist';
    data.watchlist.push(data.searchResult);
    createWatchlistEntry(data.searchResult);
    viewSwap(data.view);
  }
}

function removeSearchEntry(data) {
  if (document.querySelector('.searchContainerResult')) {
    document.querySelector('.searchContainerResult').remove();
  }
}

function createWatchlistEntry(data) {
  var watchlistEntryContainer = document.createElement('div');
  watchlistEntryContainer.className = 'watchlistEntryContainer';
  $watchlistEntries.appendChild(watchlistEntryContainer);

  var namePriceRow = document.createElement('div');
  namePriceRow.className = 'row namePriceRow';
  watchlistEntryContainer.appendChild(namePriceRow);

  var stockSymbol = document.createElement('h2');
  stockSymbol.className = 'watchlistStockSymbol';
  stockSymbol.textContent = data.price.symbol;
  namePriceRow.appendChild(stockSymbol);

  var stockPrice = document.createElement('span');
  stockPrice.className = 'stockPrice positive';
  stockPrice.textContent = '$' + data.price.regularMarketPrice.fmt;
  namePriceRow.appendChild(stockPrice);

  var todayRow = document.createElement('div');
  todayRow.className = 'row todayRow';
  watchlistEntryContainer.appendChild(todayRow);

  var todayLabel = document.createElement('h3');
  todayLabel.className = 'todayLabel';
  todayLabel.textContent = 'Today: ';
  todayRow.appendChild(todayLabel);

  var todayPercentage = document.createElement('span');
  if (checkPercentage(data.price.regularMarketChangePercent.raw) === true) {
    todayPercentage.className = 'stockPercentage positive';
  } else {
    todayPercentage.className = 'stockPercentage negative';
  }
  todayPercentage.textContent = data.price.regularMarketChangePercent.fmt;
  todayRow.appendChild(todayPercentage);

  var lowRow = document.createElement('div');
  lowRow.className = 'row lowRow';
  watchlistEntryContainer.appendChild(lowRow);

  var lowLabel = document.createElement('h3');
  lowLabel.className = 'lowLabel';
  lowLabel.textContent = 'Low: ';
  lowRow.appendChild(lowLabel);

  var lowPrice = document.createElement('span');
  lowPrice.className = 'lowPrice negative';
  lowPrice.textContent = '$' + data.price.regularMarketDayLow.fmt;
  lowRow.appendChild(lowPrice);

  var highRow = document.createElement('div');
  highRow.className = 'row highRow';
  watchlistEntryContainer.appendChild(highRow);

  var highLabel = document.createElement('h3');
  highLabel.className = 'highLabel';
  highLabel.textContent = 'High: ';
  highRow.appendChild(highLabel);

  var highPrice = document.createElement('span');
  highPrice.className = 'highPrice positive';
  highPrice.textContent = '$' + data.price.regularMarketDayHigh.fmt;
  highRow.appendChild(highPrice);
  $noStocks.setAttribute('class', 'hidden');
}

function viewSwap(view) {
  var $views = document.querySelectorAll('.view');
  var containerName = view + 'Container';
  for (var i = 0; i < $views.length; i++) {
    if (view === $views[i].getAttribute('data-view')) {
      $views[i].className = containerName;
    } else {
      $views[i].className = 'hidden';
    }
  }
}

function handleWatchlist(event) {
  viewSwap('watchlist');
}

function readMore(event) {
  debugger
  var $dots = document.querySelector('.dots');
  var $more = document.querySelector('.more');
  var $readMore = document.querySelector('.readMore');
  var $readLess = document.querySelector('.readLess');
  if ($dots.className === 'dots hidden') {
    $dots.className = 'dots';
    $readMore.textContent = 'Read More';
    $readMore.setAttribute('onclick', 'readMore()')
    $more.className = 'more hidden';
  } else {
    $dots.className = 'dots hidden';
    $readMore.textContent = 'Read Less';
    $readMore.setAttribute('onclick', 'readMore()')
    $more.className = 'more';
  }
}

window.addEventListener('DOMContentLoaded', function (event) {
  debugger
  if (data.watchlist.length === 0) {
    $noStocks.setAttribute('class', 'noStocks');
  }
  for (var i = 0; i < data.watchlist.length; i++) {
    createWatchlistEntry(data.watchlist[i]);
  }
  viewSwap('watchlist');
});
