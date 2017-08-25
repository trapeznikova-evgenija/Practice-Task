"use strict";

let context = new AudioContext();

$(function () {
  let piano = document.getElementById('piano');
  $('#piano *').each(function () {
    addProperties(this);
  });

  $('#piano *').click(function () {
    this.play();
    if (this.className === 'white_key') {
      $(this).animate({opacity: '0.3'}, 100);
      $(this).animate({opacity: '1'}, 100);
    } else {
      $(this).animate({opacity: '0.8'}, 100);
      $(this).animate({opacity: '1'}, 100);
    }
  });


  $('html').keydown(function (event) {

    $('#piano *').each(function () {
      if (event.keyCode === $(this).data('keycode')) {
        this.play();
        if (this.className === 'white_key') {
          $(this).animate({opacity: '0.3'}, 100);
          $(this).animate({opacity: '1'}, 100);
        } else {
          $(this).animate({opacity: '0.8'}, 100);
          $(this).animate({opacity: '1'}, 100);
        }
      }
    });

  });

  fall();

});

function fall() {

  $(".tile").animate({ top:'+= 200' }, 2000);
    requestAnimationFrame(fall)
}

function loadAudio(object, url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    context.decodeAudioData(request.response, function (buffer) {
      object.buffer = buffer;
    })
  };

  request.send();
}

function addProperties(object) {
  object.name = object.id;
  object.source = $(object).data('sound');
  loadAudio(object, object.source);
  object.play = function () {
    let s = context.createBufferSource();
    s.buffer = object.buffer;
    s.connect(context.destination);
    s.start(0);
    object.s = s;
  }
}

/*let notesPiano = piano.querySelectorAll('div');
 for (let i = 0; i <= notesPiano.length; i++) {
 if (event.keyCode === $(notesPiano[i]).data('keycode')) {
 console.log($(notesPiano[i]).data('keycode'));
 console.log(notesPiano[i]);
 if (notesPiano[i].className === 'white_key') {
 $(notesPiano[i]).animate({opacity: '0.3'}, 100);
 $(notesPiano[i]).animate({opacity: '1'}, 100);
 notesPiano[i].play();
 } else {
 $(notesPiano[i]).animate({opacity: '0.8'}, 100);
 $(notesPiano[i]).animate({opacity: '1'}, 100);
 notesPiano[i].play();
 }
 }
 } */