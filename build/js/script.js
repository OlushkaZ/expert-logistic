'use strict';
// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');
//
// pageHeader.classList.remove('page-header--nojs');
//
// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });

var thumbnail = document.querySelectorAll('.slides__thumbnails');
var thumbnailsSlides = document.querySelectorAll('.slides__thumbnails-item');
var slides = document.querySelectorAll('.slides');
var slidesContent = document.querySelectorAll('.slides__content-wrapper');
console.dir(slidesContent);
console.dir(thumbnail);

var addThumbnailClickHandler = function (number) {
  thumbnailsSlides[number].addEventListener('click', function () {
    if (slides) {
      for (var j = 0; j < slides.length; j++) {
        slides[j].classList.remove('slide-show');
        slides[j].classList.remove('slides--opacity');
        thumbnailsSlides[j].classList.remove('slides__thumbnail-current');
      }
      console.log(slidesContent[number].offsetHeight);
      thumbnail.offsetTop = slidesContent[number].offsetHeight;
      slides[number].classList.add('slide-show');
      setTimeout(function () {
        slides[number].classList.add('slides--opacity');
      }, 100);
      thumbnailsSlides[number].classList.add('slides__thumbnail-current');
    }
  });
};
if (thumbnailsSlides) {
  for (var i = 0; i < thumbnailsSlides.length; i++) {
    addThumbnailClickHandler(i);
  }
}
