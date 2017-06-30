var link = document.querySelectorAll('[href^="#nav"]');
var scrolled = 0;
var to = 0;

for (var i = 0; i < link.length; i++) {
  link[i].onclick = function () {
    var id = this.href.replace(/[^#]*(.*)/, '$1');
    to = document.querySelector(id).getBoundingClientRect().top;
    scrollToCoord();
  };
}

function scrollToCoord() {

  if (scrolled <= to ) {
    window.scrollTo(0, scrolled);
    scrolled = scrolled + 30;
    requestAnimationFrame(scrollToCoord);
  } else {
    window.scrollTo(0, to);
    scrolled = 0;
  }
}