function slowScroll(y, idClass) {
  $(window).scroll(function () {
    var height = $("body").scrollTop();
    console.log('hei ', height);
    if (height > y) $(idClass).animate({'opacity': '1'}, 500);
  })
}

slowScroll(820, '#smoo');