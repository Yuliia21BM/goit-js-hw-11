import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from "jquery";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayAPI from './pixabay-servise';
import createMarkup from './create-markup-image';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
AOS.init();

const searchForm = document.querySelector('form#search-form');
const imagesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const mybutton = document.getElementById("myBtn");

imagesContainer.addEventListener('click', onAddItemsClick);
searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

class PixabayAPI{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        // this.limit = 500;
    }

    
    async featchImages() {
        const API_KEY = '31109678-013e606e285b36a60c72d34b0'
        const url = `https://pixabay.com/api?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}&webformatURL`;
        try {
            const response = await axios.get(url);
            return response.json();
        } catch {
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1
    }

    // availableimages() {
    //     if (this.page * 40 > this.limit) {
    //         window.removeEventListener('scroll', onScrollWindow, {
    //             passive: true
    //         });
    //         loadMoreBtn.classList.add('is-hidden');
    //     }
    // }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 200, });
const axios = require('axios');

async function onSearchFormSubmit(e) {
    e.preventDefault();
    window.addEventListener('scroll', onScrollWindow, {
    passive: true
});
    imagesContainer.innerHTML = "";
    pixabayAPI.resetPage()
    pixabayAPI.query = e.currentTarget.elements.searchQuery.value;
    await featchImages();
}

async function onLoadMore() {
    await featchImages();
}


function onScrollWindow() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        featchImages()
    }
} 


async function featchImages() {
    await pixabayAPI.featchImages()
        .then(images => {
            loadMoreBtn.classList.remove('is-hidden');
            if (images.total === 0) {
                imagesContainer.innerHTML = "";
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                pixabayAPI.incrementPage();
                const createdImages = images.hits.map(image => createMarkup(image)).join('');
                imagesContainer.insertAdjacentHTML('beforeend', createdImages);
                lightbox.refresh();
            }
    });
}

function onAddItemsClick(evt) {
    evt.preventDefault();
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

$("#myBtn").click(function() { 
 $('html, body').animate({
 scrollTop: $("#header").offset().top 
 }, 500); 
});