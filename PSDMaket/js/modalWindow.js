window.onload = function () {
  smoothModalWindow();
};

var count = 0;

function smoothModalWindow() {
  var contactUs = document.getElementById('contact_us');
  var modalWindow = document.getElementById('main_modal');
  var closeButton = document.getElementById('button_close');

  contactUs.onclick = function () {
    getBlockTransparency(modalWindow, 0);
    getBlockTransparency(modalWindow, 1);
    modalWindow.style.display = 'block';
  };

  closeButton.onclick = function () {
    getBlockTransparency(modalWindow, 0);
    waitAndCloseWindow();
  };

  function getBlockTransparency(block, opacity) {
    setTimeout(function () {
      block.style.opacity = opacity;
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
}
