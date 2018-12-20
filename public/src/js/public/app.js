// console.log('app.js hello!')

// console.log('2 строка')
$(document).ready(function () {
  $(window).on('load', function () {
    var $preloader = $('.preloader');      
    $preloader.delay(450).fadeOut(700);
  });


  $('.search').click(function(){
    $('.search-block').slideToggle();
  });

  $('.search-block .search-icon').click(function () {
    $('.search-field').fadeToggle();
  });
  
  $('.search-close').click(function () {
    $('.search-block').slideUp();
  });  

  $('.burger').click(function () {
    $('.nav-menu').addClass('nav-menu_active');
    $('.overlay').fadeIn(100);    
  });

  $('.menu-close').click(function () {
    $('.nav-menu').removeClass('nav-menu_active');
    $('.overlay').fadeOut(100);
  });

  $('.overlay').click(function () {
    $('.nav-menu').removeClass('nav-menu_active');
    $(this).fadeOut(100);
    $('.sidebar').removeClass('sidebar_active');
    $('.bucket-menu').removeClass('bucket-menu_active');
    $('.popup-bouquet').fadeOut(50);
  });

  $('.filter-title').click(function () {
    $(this).next('.checkbox-block').slideToggle();  
  });

  $('.burger-filter').click(function () {
    $('.sidebar').addClass('sidebar_active');
    $('.overlay').fadeIn(100);
  });

  $('.sidebar-close').click(function () {
    $('.sidebar').removeClass('sidebar_active');
    $('.overlay').fadeOut(100);
  });

  $('.bucket').click(function () {
    $('.bucket-menu').addClass('bucket-menu_active');
    $('.overlay').fadeIn(100);
  });
  
  $('.catalog-picture').click(function () {
    $('.popup-bouquet').fadeIn(200);
    $('.overlay').fadeIn(100);
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

  if (document.documentElement.clientWidth < 576) {
    $('.title-info').click(function () {
      $(this).next('.list-info').slideToggle();
    });
  }

  mobiscroll.settings = {
    lang: 'ru',
    theme: 'ios'
  };

  $(function () {    

    $('#demo-desktop').mobiscroll().calendar({
      display: 'bubble',
      dateFormat: 'd MM',
      onInit: function (event, inst) {
        inst.setVal(new Date(), true);
      }      
    });

    $('#demo-responsive-time').mobiscroll().time({
      responsive: {
        small: {
          display: 'bubble'
        },
        medium: {
          touchUi: false
        }
      },
      onInit: function (event, inst) {
        inst.setVal(new Date(), true);
      }
    });
  });

  $(".owl-carousel.bouquet-slider_wrapp").owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    dots: false
  });

  $(".owl-carousel.main-list").owlCarousel({
    loop: true,
    nav: false,
    items: 2,
    dots: true,
    smartSpeed: 1000,
    responsive: { 
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      992: {
        items: 2
      }
    }
  }); 
  
  
  
});
