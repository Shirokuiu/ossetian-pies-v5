'use strict';

// main-nav
(function () {
  var button = document.querySelector('.user-block__dropdown-button-wrap');
  var menu = document.querySelector('.main-nav');
  
  button.addEventListener('click', function () {
    this.classList.toggle('user-block__dropdown-button-wrap--open');
    menu.classList.toggle('main-nav--close');
  });
})();

// selec-cart
(function () {
  var select = document.querySelectorAll('.cart__select-price');
  
  for (var i = 0, len = select.length; i < len; i++) {
    select[i].addEventListener('click', function () {
      this.classList.toggle('cart__select-price--open');
    });
  }
})();