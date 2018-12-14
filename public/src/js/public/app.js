// console.log('app.js hello!')

// console.log('2 строка')
$(document).ready(function () {
  $('.search').click(function(){
    $('.search-block').slideToggle();
  });
  
  $('.search-close').click(function () {
    $('.search-block').slideUp();
  });

  $('.search-wrapp_mobile img').click(function () {
    $('.search-field').toggleClass('active');
  });

  $('.burger').click(function () {
    $('.nav-menu').addClass('nav-menu_active');
    $('.overlay').show("100");    
  });

  $('.menu-close').click(function () {
    $('.nav-menu').removeClass('nav-menu_active');
    $('.overlay').hide("100");
  });

  $('.overlay').click(function () {
    $('.nav-menu').removeClass('nav-menu_active');
    $(this).hide("100");
    $('.sidebar').removeClass('sidebar_active');
  });

  $('.filter-title').click(function () {
    $(this).next('.checkbox-block').slideToggle();  
  });

  $('.burger-filter').click(function () {
    $('.sidebar').addClass('sidebar_active');
    $('.overlay').show("100");
  });

  $('.sidebar-close').click(function () {
    $('.sidebar').removeClass('sidebar_active');
    $('.overlay').hide("100");
  });


});
