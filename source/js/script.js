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
var input = document.querySelector('#resume-phone');

window.addEventListener('DOMContentLoaded', function () {
  var setCursorPosition = function (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function mask(evt) {
    // var matrix = evt.target.defaultValue;
    var matrix = '+7(___)___-__-__';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = evt.target.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    matrix = matrix.replace(/[_\d]/g, function () {
      return val.charAt(i++) || '_';
    });
    evt.target.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i = i < matrix.length && matrix !== evt.target.defaultValue ? ++i : matrix.indexOf('_');
    setCursorPosition(i, evt.target);
  }
  input.addEventListener('input', mask);
  input.addEventListener('focus', function () {
    input.value = '+7(___)___-__-__';
  });
});
// close.addEventListener('click', function (evt) {
//   evt.preventDefault();
//   popupResume.classList.remove('modal__show');
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
      var caption = popupResume.querySelector('.resume__caption');
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
