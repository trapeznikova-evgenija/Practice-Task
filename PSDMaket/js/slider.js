var slideNow = 1;
var slideCount = $('#slideWrapper').children().length;
var translateWidth = 0;
var slideInterval = 7000;
var navButtonId = 0;


$(document).ready(function () {
  var switchInterval = setInterval(nextSlide, slideInterval);
  $('#viewport').hover(function () {
    clearInterval(switchInterval);
    $('#navButtons').css({
      'opacity': 1
    });
    $('#prevNextButtons').css({
      'opacity': 1
    })
  }, function () {
    switchInterval =  setInterval(nextSlide, slideInterval);
    $('#navButtons').css({
      'opacity': 0
    });
    $('#prevNextButtons').css({
      'opacity': 0
    })
  });

  $('#nextButtons').click(function() {
    nextSlide();
  });

  $('#prevButtons').click(function() {
    prevSlide();
  });

  $('.slide_nav_button').click(function() {
    navButtonId = $(this).index();


    if (navButtonId + 1 != slideNow) {
      $('#point_color' + slideNow).css('background-color', '#506a85');
      translateWidth = -$('#viewport').width() * (navButtonId);
      $('#slideWrapper').css({
        'transform': 'translate(' + translateWidth + 'px, 0)',
      });
      slideNow = navButtonId + 1;
    }
    $('#point_color' + slideNow).css('background-color', '#00bc9c');
  });
});

  function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
      $('#point_color' + slideNow).css('background-color', '#506a85');
      $('#slideWrapper').css('transform', 'translate(0, 0)');
      slideNow = 1;
    } else {
      $('#point_color' + slideNow).css('background-color', '#506a85');
      translateWidth = -$('#viewport').width() * (slideNow);
      $('#slideWrapper').css({
        'transform': 'translate(' + translateWidth + 'px, 0)'
      });
      slideNow++;
    }
   $('#point_color' + slideNow).css('background-color', '#00bc9c');
  }

function prevSlide() {
  if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
    $('#point_color' + slideNow).css('background-color', '#506a85');
    translateWidth = -$('#viewport').width() * (slideCount - 1);
    $('#slideWrapper').css({
      'transform': 'translate(' + translateWidth + 'px, 0)',
    });
    slideNow = slideCount;
  } else {
    $('#point_color' + slideNow).css('background-color', '#506a85');
    translateWidth = -$('#viewport').width() * (slideNow - 2);
    $('#slideWrapper').css({
      'transform': 'translate(' + translateWidth + 'px, 0)',
    });
    slideNow--;
  }
  $('#point_color' + slideNow).css('background-color', '#00bc9c');
}
