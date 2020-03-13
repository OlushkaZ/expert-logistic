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

var thumbnailsSlides = document.querySelectorAll('.slides__thumbnails-item');
var slides = document.querySelectorAll('.slides');

var addThumbnailClickHandler = function (number) {
  thumbnailsSlides[number].addEventListener('click', function () {
    for (var j = 0; j < slides.length; j++) {
      slides[j].classList.remove('slide-show');
      slides[j].classList.remove('slides--opacity');
      thumbnailsSlides[j].classList.remove('slides__thumbnail-current');
    }
    slides[number].classList.add('slide-show');
    setTimeout(function () {
      slides[number].classList.add('slides--opacity');
    }, 100);
    thumbnailsSlides[number].classList.add('slides__thumbnail-current');
  });
};

for (var i = 0; i < thumbnailsSlides.length; i++) {
  addThumbnailClickHandler(i);
}
