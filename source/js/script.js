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

var vacancyToggles = document.querySelectorAll('.vacancy__item button');
var thumbnailsSlides = document.querySelectorAll('.slide-list__slide-btn');
var slides = document.querySelectorAll('.slide-list__item');
var activeMenu = document.querySelectorAll('.site-navigation__item--active');

if (vacancyToggles) {
  vacancyToggles.forEach(function (item) {
    item.addEventListener('click', function () {
      item.parentNode.classList.toggle('vacancy__item--closed');
      item.children[0].textContent = item.parentNode.classList.contains('vacancy__item--closed') ? 'подробнее' : 'скрыть';
    });
  });
}

var addThumbnailClickHandler = function (number) {
  if (thumbnailsSlides && slides) {
    thumbnailsSlides[number].addEventListener('click', function () {
      if (thumbnailsSlides[number].classList.contains('slide-list__slide-btn--active')) {
        return;
      }
      for (var j = 0; j < slides.length; j++) {
        slides[j].classList.add('display-none');
        slides[j].classList.add('opacity-none');
        thumbnailsSlides[j].classList.remove('slide-list__slide-btn--active');
      }
      slides[number].classList.remove('display-none');
      setTimeout(function () {
        slides[number].classList.remove('opacity-none');
      }, 100);
      thumbnailsSlides[number].classList.add('slide-list__slide-btn--active');
    });
  }
};

if (thumbnailsSlides) {
  for (var i = 0; i < thumbnailsSlides.length; i++) {
    addThumbnailClickHandler(i);
  }
}

if (activeMenu) {
  setTimeout(function () {
    activeMenu.forEach(function (menu) {
      menu.classList.add('underline');
    });
  }, 100);
}
