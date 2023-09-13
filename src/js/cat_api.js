import axios from 'axios';

const breedSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const selectorError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_67PkB6lUQEK4wJHFFO72EoMN3vE7tJ6S66gj7N01qGIYePDO5z312fk07F4gtBr5';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      fillSelector(response.data);
    })
    .catch(function (error) {
      hideLoader([selectorError]);
    });
}

function fillSelector(arr) {
  hideLoader([breedSelector]);
  const selectorOptions = arr
    .map(e => {
      return `<option value="${e.id}">${e.name}</option>`;
    })
    .join('');
  breedSelector.innerHTML = selectorOptions;
}

export function fetchCatByBreed(breedId) {
  showLoader([catInfo]);
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(function (response) {
      createInfo(response.data);
    })
    .catch(function (error) {
      hideLoader([selectorError]);
    });
}

function showLoader(arr) {
  for (let i = 0; i <= arr.length; i++) {
    arr[0].classList.add('hidden');
  }
  loader.classList.remove('hidden');
}

function hideLoader(arr) {
  for (let i = 0; i <= arr.length; i++) {
    arr[0].classList.remove('hidden');
  }
  loader.classList.add('hidden');
}

function createInfo(arr) {
  const newCat = `<div class ="info"><div class="info__columnleft"><img class="info__img" src="${arr[0].url}"></div><div class="info__columnright"><h1 class="info__header">${arr[0].breeds[0].name}</h1><p class="info__text">${arr[0].breeds[0].description}</p><p class="info__text"><b>Temperament:</b> ${arr[0].breeds[0].temperament}</p></div></div>`;
  catInfo.innerHTML = newCat;
  hideLoader([catInfo]);
}
