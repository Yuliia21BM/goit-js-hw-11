import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js'
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfoBox = document.querySelector('.country-info');

// inputEl.addEventListener('input', onCountryInput);

inputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(e) {
    e.preventDefault()
    const value = e.target.value.trim();
    if (value === "") {
                countryList.innerHTML = '';
                countryInfoBox.innerHTML = '';
                return;
            }
    fetchCountries(value)
        .then((countries) => {
            if (countries.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                countryList.innerHTML = '';
                countryInfoBox.innerHTML = '';
            } else if (countries.length <= 10 && countries.length >= 2) {
                const counreisItem = createItemsMarkup(countries);
                countryList.innerHTML = counreisItem;
                countryInfoBox.innerHTML = '';
            } else if (countries.length === 1) {
                countries.map((country) => {
                    const createdInfo = createOneCountryInfo(country);
                    countryInfoBox.innerHTML = createdInfo
                    countryList.innerHTML = '';
                })
            }
        })
        .catch((error) => {
            Notify.failure("Oops, there is no country with that name")
            countryList.innerHTML = '';
            countryInfoBox.innerHTML = '';
        });
}

function createItemsMarkup(countries) {
    return countries.map((country) => `<li class="item"><img src="${country.flags.svg}" alt="Flag" class="item-img" /><p>${country.name.official}</p></li>`).join("");
}

function createOneCountryInfo(country) {
    return `<ul class="one-country-info"><li class="one-country-main-item"><img src="${country.flags.svg}" alt="Flag" class="one-country-item-img" /><p>${country.name.official}</p></li><li class="one-country-item"><p><span class="one-country-key">Capital:</span> ${country.capital}</p></li><li class="one-country-item"><p><span class="one-country-key">Population:</span> ${country.population}</p></li><li class="one-country-item"><p><span class="one-country-key">Languages:</span> ${Object.values(country.languages)}</p></li></ul>
`
}

