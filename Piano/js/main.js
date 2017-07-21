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

  console.log($('div#piano > div'));


  $('#buttonMenuLeftLoctave').click(function () {

    /*
    if ($('.big_octave').hasClass('active_octave_left')) {
      $('.big_octave').removeClass('active_octave_left');
      $('.big_octave *').removeAttr('data-keycode').attr('data-keycode', ' ');
      if (!$('.contr_octave').hasClass('active_octave_right')) {
        $('.contr_octave').addClass('active_octave_left');
        $('.octave_menu_big_left').css({'display': 'none'});
        $('.octave_menu_controctave_left').css({'display': 'inline-block'});
      } else {
        $('.big_octave').addClass('active_octave_left');
      }
    }

    if ($('.small_octave').hasClass('active_octave_left')) {
      $('.small_octave').removeClass('active_octave_left');
      $('.small_octave *').removeAttr('data-keycode').attr('data-keycode', ' ');
      if (!$('.big_octave').hasClass('active_octave_right')) {
        $('.big_octave').addClass('active_octave_left');
        $('.octave_menu_small_left').css({'display': 'none'});
        $('.octave_menu_big_left').css({'display': 'inline-block'});
      } else {
        $('.contr_octave').addClass('active_octave_left');
        $('.octave_menu_small_left').css({'display': 'none'});
        $('.octave_menu_controctave_left').css({'display': 'inline-block'});
      }
    }

    if ($('.first_octave').hasClass('active_octave_left')) {
      $('.first_octave').removeClass('active_octave_left');

      if ($('.small_octave').hasClass('active_octave_right')) {
        $('.big_octave').addClass('active_octave_left');
      } else {
        $('.small_octave').addClass('active_octave_left');
      }
    }

    if ($('.second_octave').hasClass('active_octave_left')) {
      $('.second_octave').removeClass('active_octave_left');

      if ($('.first_octave').hasClass('active_octave_right')) {
        $('.small_octave').addClass('active_octave_left');
      } else {
        $('.first_octave').addClass('active_octave_left');
      }
    }
      */




  });

  $('#buttonMenuRightLoctave').click(function () {

    /*
    if ($('.contr_octave').hasClass('active_octave_left')) {
      $('.contr_octave').removeClass('active_octave_left');
      $('.contr_octave *').removeAttr('data-keycode').attr('data-keycode', ' ');

      if ($('.big_octave').hasClass('active_octave_right')) {
        $('.small_octave').addClass('active_octave_left');
        $('.octave_menu_controctave_left').css({'display': 'none'});
        $('.octave_menu_small_left').css({'display': 'inline-block'});
      } else {
        $('.big_octave').addClass('active_octave_left');
        $('.octave_menu_controctave_left').css({'display': 'none'});
        $('.octave_menu_big_left').css({'display': 'inline-block'});
      }
    }

    if ($('.big_octave').hasClass('active_octave_left')) {
      $('.big_octave').removeClass('active_octave_left');
      $('.big_octave *').removeAttr('data-keycode').attr('data-keycode', ' ');

      if ($('.small_octave').hasClass('active_octave_right')) {
        console.log('!!!');
        $('.first_octave').addClass('active_octave_left');
        $('.octave_menu_big_left').css({'display': 'none'});
        $('.octave_menu_first_left').css({'display': 'inline-block'});

      } else {
        console.log('активная октава small');
        $('.small_octave').addClass('active_octave_left');
        $('.octave_menu_big_left').css({'display': 'none'});
        $('.octave_menu_small_left').css({'display': 'inline-block'});
      }
    }

    if ($('.small_octave').hasClass('active_octave_left')) {
      $('.small_octave').removeClass('active_octave_left');

      if ($('.first_octave').hasClass('active_octave_right')) {
        $('.second_octave').addClass('active_octave_left')
      } else {
        $('.first_octave').addClass('active_octave_left');
      }
    }

    if ($('.first_octave').hasClass('active_octave_left')) {
      $('.first_octave').removeClass('active_octave_left');

      if ($('.second_octave').hasClass('active_octave_right')) {
        $('.first_octave').addClass('active_octave_left');
      } else {
        $('.second_octave').addClass('active_octave_left');
      }
    } */


  })

});




function loadAudio(object, url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  
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