//Smooth scroll
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

//show more
var showMoreButton = document.getElementById('button_more');
var showMoreBlock = document.getElementById('blocks_open');
var comeBackButton = document.getElementById('back');

comeBackButton.style.display = 'none';

showMoreButton.addEventListener('click', function (event) {
  showMoreButton.style.display = 'none';
  getInvisibleBlock();
  interval();
  openBlock();
  comeBackButton.style.display = 'block'
}, false);


comeBackButton.addEventListener('click', function (event) {
  showMoreBlock.style.display = 'none';
  comeBackButton.style.display = 'none';
  showMoreButton.style.display = 'block';
  showMoreBlock.style.opacity = 0;

}, false);

function interval() {
  setTimeout(function () {
    showMoreBlock.style.opacity = 1;
  }, 800)
}

function openBlock() {
  showMoreBlock.style.display = 'block'
}

function getInvisibleBlock() {
  setTimeout(function () {
    showMoreBlock.style.opacity = 0;

  }, 100)
}

//roll-up
var buttonId = document.getElementById('up_down');
buttonId.style.display = 'none';

window.onscroll = function () {
  var scrollY = window.pageYOffset;

  if (scrollY > 160) {
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
    if (scrollY > 0) {
      window.scrollTo(0, scrollY);
      scrollY = scrollY - 80;
      requestAnimationFrame(scrolling)
    } else {
      window.scrollTo(0, 0);
    }
  }
};

//modal window 

var contactUs = document.getElementById('contact_us');
var modalWindow = document.getElementById('main_modal');
var closeButton = document.getElementById('button_close');
var count = 0;

contactUs.addEventListener('click', function (event) {
  getInvisibleModalWindow();
  wait();
  openWindow();
}, false);

closeButton.addEventListener('click', function (event) {
  waitInv();
  waitAndCloseWindow();
}, false);

function getInvisibleModalWindow() {
  setTimeout(function () {
    modalWindow.style.opacity = 0;

  }, 100)
}

function openWindow() {
  modalWindow.style.display = 'block';
}
function wait() {
  setTimeout(function () {
    modalWindow.style.opacity = 1;
  }, 500)
}

function waitInv() {
  setTimeout(function () {
    modalWindow.style.opacity = 0;
  }, 500)
}

function waitAndCloseWindow() {
  if (count < 60) {
    count++;
    requestAnimationFrame(waitAndCloseWindow);
  } else {
    modalWindow.style.display = 'none';
    count = 0;
  }
}