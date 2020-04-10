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
var resumeForm = document.querySelector('.resume__form');
var inputPhone = resumeForm.querySelector('#resume-phone');
var inputName = resumeForm.querySelector('#resume-name');
var inputEMail = resumeForm.querySelector('#resume-e-mail');
var inputFile = resumeForm.querySelector('#resume-file');
var fileLoaderHandler = document.querySelector('.file-loader_handler');
var fileLoaderButton = document.querySelector('.file-loader_button');
var fileLoaderDeleteFile = document.querySelector('.file-loader_delete-file');

/*eslint-disable */
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
/* eslint-enable */

inputFile.addEventListener('change', function (evt) {
  if (evt.target.files && evt.target.files.length >= 1) {
    var FILE_TYPES = ['txt', 'doc', 'docx', 'pdf'];
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      fileLoaderHandler.classList.add('display-none');
      fileLoaderButton.children[0].textContent = fileName;
      fileLoaderButton.classList.remove('file-loader_button--error');
      fileLoaderButton.classList.remove('display-none');
      fileLoaderDeleteFile.classList.remove('display-none');
    } else {
      inputFile.value = '';
      fileLoaderButton.classList.remove('display-none');
      fileLoaderButton.children[0].textContent = 'Не удалось загрузить файл';
      fileLoaderButton.classList.add('file-loader_button--error');
      fileLoaderHandler.textContent = 'попробовать снова?';
      fileLoaderHandler.classList.add('file-loader_handler--again');
      fileLoaderDeleteFile.classList.add('display-none');
    }
  }
});

fileLoaderDeleteFile.addEventListener('click', function () {
  inputFile.value = '';
  fileLoaderHandler.classList.remove('display-none');
  fileLoaderHandler.textContent = 'прикрепите резюме';
  fileLoaderHandler.classList.remove('file-loader_handler--again');
  fileLoaderButton.children[0].textContent = '';
  fileLoaderButton.classList.add('display-none');
});

var maskPhoneOptions = {
  mask: '+{7}(000)000-00-00'
};
window.mask = new window.IMask(inputPhone, maskPhoneOptions);

inputPhone.addEventListener('click', function () {
  maskPhoneOptions = {
    mask: '+{7}(000)000-00-00',
    lazy: false
  };
  window.mask = new window.IMask(inputPhone, maskPhoneOptions);
});

var deleteInvalid = function (input) {
  if (input.classList.contains('resume__invalid')) {
    input.classList.remove('resume__invalid');
  }
  var lab = resumeForm.querySelector('label[for = ' + input.id + ']');
  if (lab.classList.contains('resume__invalid--' + input.id)) {
    lab.classList.remove('resume__invalid--' + input.id);
  }
};

var checkInputCaption = function (input) {
  if (input.value) {
    input.parentNode.classList.add('resume__input-caption');
  } else if (input.parentNode.classList.contains('resume__input-caption')) {
    input.parentNode.classList.remove('resume__input-caption');
  }
};

inputName.addEventListener('blur', function () {
  deleteInvalid(inputName);
  inputName.checkValidity();
  checkInputCaption(inputName);
});

inputEMail.addEventListener('blur', function () {
  deleteInvalid(inputEMail);
  inputEMail.checkValidity();
  checkInputCaption(inputEMail);
});

inputPhone.addEventListener('blur', function () {
  deleteInvalid(inputPhone);
  inputPhone.checkValidity();
  checkInputCaption(inputPhone);
});


resumeForm.addEventListener('invalid', function (evt) {
  var lab = resumeForm.querySelector('label[for=' + evt.target.id + ']');
  if (evt.target.value) {
    evt.target.classList.add('resume__invalid');
    lab.classList.add('resume__invalid--' + evt.target.id);
  }

}, true);

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
  Array.prototype.forEach.call(resumeButtons, function (item) {
    var vacancy = item.parentNode.querySelector('.vacancy__item-header').textContent;
    item.addEventListener('click', function () {
      popupResume.classList.add('modal__show');
      var caption = popupResume.querySelector('.resume__vacancy-name');
      caption.textContent = vacancy;
      inputName.focus();
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
