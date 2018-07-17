'use strict';

// main-nav
(function () {
  var button = document.querySelector('.user-block__dropdown-button-wrap');
  var menu = document.querySelector('.main-nav');
  
  button.addEventListener('click', function () {
    this.classList.toggle('user-block__dropdown-button-wrap--open');
    menu.classList.toggle('hidden');
  });
})();

// selec-cart
(function () {
  var select = document.querySelectorAll('.cart__select-price');
  
  for (var i = 0, len = select.length; i < len; i++) {
    select[i].addEventListener('click', function (evt) {
      var item = evt.target.closest('.cart__select-price-description-items');
      var val = this.querySelector('.cart__select-price-val');
      var valWeight = val.querySelector('.cart__select-price-weight');
      var valSize = val.querySelector('.cart__select-price-size');
      var valPrice = val.querySelector('.cart__select-price-total');
      
      this.classList.toggle('cart__select-price--open');
      
      if (item) {
        var itemWeight = item.querySelector('.cart__select-price-weight');
        var itemSize = item.querySelector('.cart__select-price-size');
        var itemPrice = item.querySelector('.cart__select-price-total');
        
        valWeight.textContent = parseInt(itemWeight.textContent, 10);
        valSize.textContent = parseInt(itemSize.textContent, 10);
        valPrice.textContent = parseInt(itemPrice.textContent, 10);
      }
    });
  }
})();

// cart
(function () {
  var cart = document.querySelectorAll('.cart-js');
  var prices = document.querySelectorAll('.prices-js');
  var incDec = document.querySelectorAll('.incDec-js');
  var basket = document.querySelector('.basket-js');
  var basketCount = basket.querySelectorAll('.basketCount-js');
  var basketTotalPrice = basket.querySelectorAll('.basketTotalPrice-js');
  
  basket.setAttribute('data-count', '0');
  basket.setAttribute('data-total-price', '0');
  
  for (var i = 0, len = incDec.length; i < len; i++) {
    incDec[i].addEventListener('click', function (evt) {
      var dec = evt.target.closest('.dec-js');
      var val = this.querySelector('.val-js');
      var inc = evt.target.closest('.inc-js');
      
      if (dec) {
        if (parseInt(val.textContent, 10) > 1) {
          val.textContent = parseInt(val.textContent, 10) - 1;
        }
      }
      
      if (inc) {
        val.textContent = parseInt(val.textContent, 10) + 1;
      }
    });
  }
  
  for (var i = 0, len = prices.length; i < len; i++) {
    var pricesWeight = prices[i].querySelectorAll('.price-weight-js');
    var pricesBasic = prices[i].querySelectorAll('.price-basic-js');
    var pricesChild = prices[i].querySelectorAll('.prices-child-js');
    
    prices[i].setAttribute('data-current-price', '');
    
    for (var j = 0, jLen = pricesChild.length; j < jLen; j++) {
      pricesChild[j].setAttribute('data-price', '');
      pricesChild[j].dataset.price = pricesBasic[j].dataset.price;
      
      if (pricesChild[j].classList.contains('active')) {
        prices[i].dataset.currentPrice = pricesChild[j].dataset.price;
      }
    }
    
    for (var j = 0, jLen = pricesWeight.length; j < jLen; j++) {
      pricesWeight[j].textContent = pricesWeight[j].dataset.weight;
    }
    
    for (var j = 0, jLen = pricesBasic.length; j < jLen; j++) {
      pricesBasic[j].textContent = pricesBasic[j].dataset.price;
    }
    
    prices[i].addEventListener('click', function (evt) {
      var pricesChildSelect = evt.target.closest('.prices-child-js');
      var pricesChildrenSelect = this.querySelectorAll('.prices-child-js');
      
      if (pricesChildSelect) {
        if (!(pricesChildSelect.classList.contains('active'))) {
          for (var j = 0, jLen = pricesChildrenSelect.length; j < jLen; j++) {
            pricesChildrenSelect[j].classList.remove('active');
          }
        };
        pricesChildSelect.classList.add('active');
        this.dataset.currentPrice = pricesChildSelect.dataset.price;
      }
    });
  }
  
  for (var i = 0, len = cart.length; i < len; i++) {
    cart[i].setAttribute('data-count', '1');
    cart[i].setAttribute('data-total-price', '0');
    for (var j = 0, jLen = prices.length; j < jLen; j++) {
      cart[i].dataset.totalPrice = prices[j].dataset.currentPrice;
    }
    cart[i].addEventListener('click', function (evt) {
      var cartSelectPriceWrap = this.querySelector('.prices-js');
      var cartSelectPrice = evt.target.closest('.prices-js');
      var cartIncDecWrap = evt.target.closest('.incDec-js');
      var cartDec = evt.target.closest('.dec-js');
      var cartIncDecVal = this.querySelector('.val-js');
      var cartInc = evt.target.closest('.inc-js');
      var cartAdd = evt.target.closest('.cartAdd-js');
      
      if (cartSelectPrice) {
        this.dataset.totalPrice = cartSelectPrice.dataset.currentPrice;
        if (cartIncDecVal !== null) {
          cartIncDecVal.textContent = 1;
        }
      }
      
      if (cartDec) {
        if (parseInt(this.dataset.count, 10) > 1) {
          this.dataset.totalPrice = parseInt(this.dataset.totalPrice, 10) - parseInt(cartSelectPriceWrap.dataset.currentPrice, 10);
          this.dataset.count = parseInt(this.dataset.count, 10) - 1;
        }
      }
      
      if (cartInc) {
        this.dataset.totalPrice = parseInt(this.dataset.totalPrice, 10) + parseInt(cartSelectPriceWrap.dataset.currentPrice, 10);
        this.dataset.count = parseInt(this.dataset.count, 10) + 1;
      }
      
      if (cartAdd) {
        basket.dataset.count = parseInt(basket.dataset.count, 10) + parseInt(this.dataset.count, 10);
        basket.dataset.totalPrice = parseInt(basket.dataset.totalPrice, 10) + parseInt(this.dataset.totalPrice, 10);
        for (var j = 0, jLen = basketCount.length; j < jLen; j++) {
          basketCount[j].textContent = basket.dataset.count;
        }
        for (var j = 0, jLen = basketTotalPrice.length; j < jLen; j++) {
          basketTotalPrice[j].textContent = basket.dataset.totalPrice;
        }
      }
    });
  }
})();

// features-slider
(function () {
  var slider = document.querySelector('.features__slider');
  
  if (slider !== null) {
    $(document).ready(function(){
      $(".features__slider").owlCarousel({
        slideTransition: 'ease',
        smartSpeed: 200,
        autoplay: false,
        nav: true,
        responsive: {
          1800: {
            items: 7
          },
          1330: {
            items: 6
          },
          1000: {
            items: 3
          },
          320: {
            items: 1,
            margin: 0
          }
        }
      });
    });
  }
})();

// composition-slider
(function () {
  var slider = document.querySelector('.composition__slider');
  var compositionSlide = slider.querySelectorAll('.composition__slider-slide');
  
  for (var i = 0, len = compositionSlide.length; i < len; i++) {
    compositionSlide[i].addEventListener('mouseover', function (evt) {
      var compositionLink = evt.target.closest('.composition__slider-link');
      var compositionImg = this.querySelector('.composition__slider-img');
      
      if (compositionLink) {
        compositionImg.classList.add('composition__slider-img--hover');
        compositionImg.classList.remove('composition__slider-img--no-hover');
      }
    });
    
    compositionSlide[i].addEventListener('mouseout', function (evt) {
      var compositionLink = evt.target.closest('.composition__slider-link');
      var compositionImg = this.querySelector('.composition__slider-img');
      
      if (compositionLink) {
        compositionImg.classList.remove('composition__slider-img--hover');
        compositionImg.classList.add('composition__slider-img--no-hover');
      }
    });
  }
  
  if (slider !== null) {
    $(document).ready(function(){
      $(".composition__slider").owlCarousel({
        slideTransition: 'ease',
        smartSpeed: 200,
        autoplay: false,
        nav: true,
        responsive: {
          1800: {
            items: 7
          },
          1410: {
            items: 6
          },
          1000: {
            items: 3
          },
          320: {
            items: 1,
            margin: 0
          }
        }
      });
    });
  }
})();

// popular-good-slider
(function () {
  var slider = document.querySelector('.popular-good__slider');
  
  if (slider !== null) {
    $(document).ready(function(){
      $(".popular-good__slider").owlCarousel({
        slideTransition: 'ease',
        smartSpeed: 200,
        autoplay: false,
        nav: true,
        responsive: {
          1840: {
            items: 6
          },
          1600: {
            items: 5
          },
          1250: {
            items: 4
          },
          1000: {
            items: 3
          }
        }
      });
    });
  }
})();