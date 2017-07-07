$(window).on('resize', function() {
  if ($(this).width() > 768) {
    $('.nav').show();
  } else {
    $('.nav').hide();
  }
});

$('.hamburg_button').on('click', function() {
  $('.nav').slideToggle();
  $(this).toggleClass('toggled');
});
