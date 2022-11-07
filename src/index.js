import $ from "jquery";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayAPI from './pixabay-servise';
import createMarkup from './create-markup-image';
import './css/styles.css';


const searchForm = document.querySelector('form#search-form');
const imagesContainer = document.querySelector('.gallery');
// const allItems = document.querySelectorAll('a.gallery__image')
const loadMoreBtn = document.querySelector('.load-more');
const mybutton = document.getElementById("myBtn");

imagesContainer.addEventListener('click', onAddItemsClick);
searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.classList.add('is-hidden');

const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 200, });

async function onSearchFormSubmit(e) {
    e.preventDefault();
    loadMoreBtn.classList.remove('is-hidden');
    window.addEventListener('scroll', onScrollWindow, {
    passive: true
});
    imagesContainer.innerHTML = "";
    pixabayAPI.resetPage()
    pixabayAPI.query = e.currentTarget.elements.searchQuery.value;
    await featchImages();
}

async function featchImages() {
    await pixabayAPI.featchImages().then(images => {
        if (images.data.total === 0) {
            loadMoreBtn.classList.add('is-hidden');
                imagesContainer.innerHTML = "";
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        else {
                pixabayAPI.incrementPage();
                const createdImages = images.data.hits.map(image => createMarkup(image)).join('');
                imagesContainer.insertAdjacentHTML('beforeend', createdImages);
                lightbox.refresh();
        }
        return images.data.totalHits;
    }).then((totalHits) => {
        const allItems = document.querySelectorAll('a.gallery__image');
    if (allItems.length === totalHits) {
            loadMoreBtn.classList.add('is-hidden');
    }
        return totalHits;
    })
}

function onAddItemsClick(evt) {
    evt.preventDefault();
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