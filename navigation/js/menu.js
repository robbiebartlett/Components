

(function ($) {
  'use strict'; 

//toggle menu 
  $('.rb-navigation__toggle').on('click', function (e) {

    $('.rb-navigation').toggleClass('active');
    var primaryNav = $('.rb-navigation__toggle');

    if (primaryNav.attr("aria-expanded") === "false") {
      primaryNav.attr("aria-expanded", "true");
    } else {
      primaryNav.attr("aria-expanded", "false");
    }

    // toggle menu/close
    if ($(this).text() == "Close")
    $(this).text("Menu")
 else
    $(this).text("Close");

}); 

 
//toggle sub-menu
  $('.rb-navigation__submenu-toggle').on('click', function (e) {
    e.preventDefault();

  //Set ARIA values
    var primaryLevelButton = $(this);
    if (primaryLevelButton.attr("aria-expanded") === "false") {
      primaryLevelButton.attr("aria-expanded", "true");
    } else {
      primaryLevelButton.attr("aria-expanded", "false");
    }


  //toggle submenu & ARIA values
    var openMenu=$(this).parent().toggleClass('active');    
    $(".rb-navigation__list-item").not(openMenu).removeClass('active');
    $(".rb-navigation__submenu-toggle").not(this).attr("aria-expanded","false");

  }); 


  // Accessible Desktop navigation
  $('.rb-navigation').find('.rb-navigation__submenu-toggle-one > rb-navigation__list-item').on('focusin', function () {
    $('.rb-navigation__submenu-toggle-one > .rb-navigation__list-item').removeClass('js-focus');
  });
  $('.rb-navigation-sr-expand__btn').on('click', function (e) {
    var isAlreadyOpen = $(this).closest('.rb-navigation__submenu-toggle-one > li.js-focus').length;
    $('.rb-navigation__submenu-toggle-one > li').removeClass('js-focus');

    if (!isAlreadyOpen) {
      $(this).closest('.rb-navigation__submenu-toggle-one > .rb-navigation__list-item').addClass('js-focus');
    }
  });
  $('.rb-navigation').on('mouseover', function () {
    $(this).find('.js-focus').removeClass('js-focus');
  });
  $('body').on('keyup', function (e) {
    if (e.keyCode === 27) {
      $('.js-focus').removeClass('js-focus');
    }
  }); // END: WCAG-7
})(jQuery);




