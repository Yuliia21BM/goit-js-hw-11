export default function createMarkup(image) {
    return `<a href="${image.largeImageURL}" class="photo-card gallery__image" data-aos="fade-up">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" clas="galery-image gallery__image" width="280"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${image.downloads}
    </p>
  </div>
</a>`
}