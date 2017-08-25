"use strict";
/*
  C - До
  D - Ре
  E - Ми
  F - Фа
  G - Соль
  A - Ля
  B - Си
*/

let notes = ['D', 'A', 'A', 'F', 'E', 'E', 'E', 'E', 'F', 'D', 'A', 'A', 'F', 'E', 'E', 'E', 'E', 'F'];

$(function () {

  let blockForRect = document.getElementById('blockForRect');

  //$('.rect').animate({top: '+=180px'}, 2000);

  notes.forEach(function (item, i, arr) {
    if (item === $('.rect_re').data('note')) {
      let reNote = document.createElement('div');
      reNote.className = 'rect rect_re';
      blockForRect.appendChild(reNote);
      $(reNote).animate({top: '+=180px'}, 2000);
    }
  });

});
