//Smooth scroll

var linkNav = document.querySelectorAll('[href^="#nav"]'), speed = 1;// скорость

for (var i = 0; i < linkNav.length; i++) {
  
  linkNav[i].onclick = function () {

    var checkWindow = window.pageYOffset, hash = this.href.replace(/[^#]*(.*)/, '$1');
    var toFirst = document.querySelector(hash).getBoundingClientRect().top;
    var start = null;

    requestAnimationFrame(step);
    function step(time) {
      
      if (start === null) start = time;

      var progress = time - start;
      var right = (toFirst < 0 ? Math.max(checkWindow - progress / speed, checkWindow + toFirst) : Math.min(checkWindow + progress / speed, checkWindow + toFirst));

      window.scrollTo(0, right);
      if (right != checkWindow + toFirst) {
        requestAnimationFrame(step)
      }
      else {
        location.hash = hash
      }
    }
    return false;
  }
}

//show more

var showMoreButton = document.getElementById('button_more');
var showMoreBlock = document.getElementsByClassName('blocks_open');

showMoreButton.addEventListener("click", function (event) {
  event.preventDefault();
  showMoreButton.classList.add('hidden_block');
  opacity();
  showMoreBlock[0].classList.add('open_block');
}, false);

function opacity() {
  
  setTimeout(function () {
    var showMoreBox = document.getElementsByClassName('blocks_open');

    for (var i = 0; i < showMoreBox.length; i++) {
      console.log(showMoreBox.length); 
      var showMoreBoxAll = showMoreBox[i];

      showMoreBoxAll.classList.add('opacity_visible');
    }
  }, 500);
}

//roll-up

var buttonId = document.getElementById('up_down');
Up();

function Up() {
  
  Show_Button();
  
  buttonId.addEventListener("click", function (event) {
    event.preventDefault();
    function down() {
      var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

      if (top > 0) {
        window.scrollBy(0, -100);
        buttonId.classList.remove('emergence');
        requestAnimationFrame(down);
      }
    }

    down();
  }, false);
}

function Show_Button() {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 153) {
      buttonId.classList.add('emergence');
    }
    else {
      buttonId.classList.remove('emergence');
    }
  })
}

//modal window 

