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

var popupResume = document.querySelector('.modal__resume');
var close = popupResume.querySelector('.modal__close');
var resumeButtons = document.querySelectorAll('.vacancy__button');
var vacancyToggles = document.querySelectorAll('.vacancy__item button');
var thumbnailsSlides = document.querySelectorAll('.slide-list__slide-btn');
var slides = document.querySelectorAll('.slide-list__item');
var activeMenu = document.querySelectorAll('.site-navigation__item--active');
var inputPhone = document.querySelector('#resume-phone');
// var inputName = document.querySelector('#resume-name');
// var inputEMail = document.querySelector('#resume-e-mail');

var maskOptions = {
  mask: '+{7}(000)000-00-00'
};
window.mask = new window.IMask(inputPhone, maskOptions);

inputPhone.addEventListener('click', function () {
  maskOptions = {
    mask: '+{7}(000)000-00-00',
    lazy: false
  };
  window.mask = new window.IMask(inputPhone, maskOptions);
});

// inputPhone.addEventListener('blur', function () {
//   if (inputPhone.value === '+7(___)___-__-__') {
//     // maskOptions.mask = '+{7}(000)000-00-00';
//     inputPhone.value = '';
//     maskOptions.lazy = true;
//     window.mask = new window.IMask(inputPhone, maskOptions);
//   }
// });

// inputName.addEventListener('input', function () {
//   if (inputName.value === '' && inputName.classList.contains('resume__valid')) {
//     inputName.classList.remove('resume__valid');
//   } else if (!inputName.classList.contains('resume__valid')) {
//     inputName.classList.add('resume__valid');
//   }
// });
//
// inputEMail.addEventListener('input', function () {
//   if (inputEMail.value === '' && inputEMail.classList.contains('resume__valid')) {
//     inputEMail.classList.remove('resume__valid');
//   } else if (!inputEMail.classList.contains('resume__valid')) {
//     inputEMail.classList.add('resume__valid');
//   }
// });

var closePopup = function (evt) {
  if (popupResume) {
    evt.preventDefault();
    if (popupResume.classList.contains('modal__show')) {
      popupResume.classList.remove('modal__show');
    }
  }
};

close.addEventListener('click', closePopup);

popupResume.addEventListener('click', function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt);
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    closePopup(evt);
  }
});

if (resumeButtons) {
  resumeButtons.forEach(function (item) {
    var vacancy = item.parentNode.querySelector('.vacancy__item-header').textContent;
    item.addEventListener('click', function () {
      popupResume.classList.add('modal__show');
      var caption = popupResume.querySelector('.resume__vacancy-name');
      caption.textContent = vacancy;
    });
  });
}

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
