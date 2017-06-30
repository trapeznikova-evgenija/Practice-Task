var BUTTON_VISIBILITY_POSITION = 160;
var STARTING_POSITION = 0;
var SCROLLING_SPEED = 80;
var buttonId = document.getElementById('up_down');

window.onscroll = function () {
  var scrollY = window.pageYOffset;

  if (scrollY > BUTTON_VISIBILITY_POSITION) {
    showButton();
  } else {
    buttonId.style.display = 'none'
  }

  buttonId.onclick = function () {
    scrolling();
  };

  function showButton() {
    buttonId.style.display = 'block';
  }

  function scrolling() {
    if (scrollY > STARTING_POSITION) {
      window.scrollTo(STARTING_POSITION, scrollY);
      scrollY = scrollY - SCROLLING_SPEED;
      requestAnimationFrame(scrolling)
    } else {
      window.scrollTo(STARTING_POSITION, STARTING_POSITION);
    }
  }
};