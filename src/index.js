import { fetchBreeds, fetchCatByBreed } from './js/cat_api';

const breedSelector = document.querySelector('.breed-select');

fetchBreeds();

breedSelector.addEventListener('change', e => fetchCatByBreed(e.target.value));
