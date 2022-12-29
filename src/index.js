import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
/* import COUNTRY from './fetchCountries';
 */ import countryCard from './templates/countryCard.hbs';
import countryList from './templates/countryList.hbs';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

// function fetchCountries(countryName) {
//   return fetch(`${BASE_URL}${countryName}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       if (data.length > 10) {
//         return Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       }
//     })
//     .then(data => {
//       if (data.length >= 2 && data.length <= 10) {
//         return response.json();
//       }
//     });
// }

/* fetchCountries(countryName)
 */

function renderCountryCard(country) {
  const markup = countryCard(country);
  infoEl.innerHTML = markup;
  listEl.innerHTML = '';
}

function renderCountriesList(country) {
  const markupList = countryList(country);
  listEl.innerHTML = markupList;
  infoEl.innerHTML = '';
}

function onInputChange(event) {
  const countryName = event.target.value.trim();
  if (countryName.length === 0) {
    infoEl.innerHTML = '';
    listEl.innerHTML = '';
    return;
  }
  fetchCountries(countryName).then(data => {
    console.log(data);
    if (data.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
    if (data.length >= 2 && data.length <= 10) {
      renderCountriesList(data);
    }
    if (data.length === 1) {
      renderCountryCard(data);
    }
  });
  /*     .then(data => {
      if (data.length >= 2 && data.length <= 10) {
        renderCountriesList(country);
      }
      return data;
    })
    .then(data => {
      if (data.length === 1) {
        renderCountryCard(country);
      }
    })
    .catch(error => {
      onFetchError();
    }); */
  /* fetchCountries(countryName).then(renderCountryCard).catch(onFetchError); */
}

export function onFetchError() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}

/* fetchCountries()
  .then(data => {
    if (data.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
  })
  .then(data => {
    if (data.length >= 2 && data.length <= 10) {
      return response.json();
    }
  });
 */
