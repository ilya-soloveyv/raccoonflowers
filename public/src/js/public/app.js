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
    $('.bucket-menu').removeClass('bucket-menu_active');
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

  $('.bucket').click(function () {
    $('.bucket-menu').addClass('bucket-menu_active');
    $('.overlay').show("100");
  });

  $('.more-info').click(function () {    
    $('.desc-text').slideToggle();
  });

  $('.more-info_mobile').click(function () {
    $('.composition-bouquet-list').slideToggle();
  });

  $(".picture-list").niceScroll({
    cursorcolor: "#CFBC9E",
  });
  
  if (document.documentElement.clientWidth < 992) {    
    $('.size-check').click(function () {
      $('.slide-size').fadeToggle();
    });
  }
  

  
});
