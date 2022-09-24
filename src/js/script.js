import { getSearchTerm, retrieveSearchResults } from './dataFunctions.js';
import {
  clearPushListener,
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
} from './searchBar.js';
import {
  buildSearchResults,
  deleteSearchResluts,
  setStatsLine,
} from './searhResults.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById('search'),
    clear = document.getElementById('clear'),
    form = document.getElementById('searchBar');
  search.addEventListener('input', (event) => {
    showClearTextButton(event),
      setTimeout(submitTheSearch(event), 2500),
      clearTimeout(submitTheSearch(event));
  });
  clear.addEventListener('click', clearSearchText);
  clear.addEventListener('keydown', clearPushListener);
  form.addEventListener('submit', submitTheSearch);

  search.addEventListener('change', submitTheSearch);
};

const submitTheSearch = (event) => {
  event.preventDefault();

  deleteSearchResluts();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;

  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
