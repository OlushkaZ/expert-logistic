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

var thumbnailsSlides = document.querySelectorAll('.slide-list__slide-btn');
var slides = document.querySelectorAll('.slide-list__item');

var addThumbnailClickHandler = function (number) {
  thumbnailsSlides[number].addEventListener('click', function () {
    for (var j = 0; j < slides.length; j++) {
      if (!slides[j].classList.contains('display-none')) {
        slides[j].classList.add('display-none');
      }
      if (!slides[j].classList.contains('opacity-none')) {
        slides[j].classList.add('opacity-none');
      }
      thumbnailsSlides[j].classList.remove('slide-list__slide-btn--active');
    }
    slides[number].classList.remove('display-none');
    setTimeout(function () {
      slides[number].classList.remove('opacity-none');
    }, 100);
    thumbnailsSlides[number].classList.add('slide-list__slide-btn--active');
  });
};

for (var i = 0; i < thumbnailsSlides.length; i++) {
  addThumbnailClickHandler(i);
}
