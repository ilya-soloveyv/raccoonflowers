// console.log('app.js hello!')

// console.log('2 строка')
$(document).ready(function () {
  $('.search').click(function(){
    $('.search-block').slideToggle();
  });
  
  $('.search-close').click(function () {
    $('.search-block').slideUp();
  });
});
