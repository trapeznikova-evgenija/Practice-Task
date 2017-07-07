var STARTY_WHOWEARE_BLOCK = 374;
var STARTY_LATESTWORKS_BLOCK = 1217;
var STARTY_GETTOUCH_BLOCK = 2500;
var STARTY_FOOTER = 3028;

addEventListener('scroll', function () {
  var scrollYAppear = window.pageYOffset;

  if (scrollYAppear > STARTY_WHOWEARE_BLOCK) {
    $('#whoWeAre').animate({opacity: '1'}, 2000);
  }

  if (scrollYAppear > STARTY_LATESTWORKS_BLOCK) {
    $('#latestWorks').animate({opacity: '1'}, 2000);
  }

  if (scrollYAppear > STARTY_GETTOUCH_BLOCK) {
    $('#getTouch').animate({opacity: '1'}, 2000);
  }

  if (scrollYAppear > STARTY_FOOTER) {
    $('#footer').animate({opacity: '1'}, 2000);
  }
});
