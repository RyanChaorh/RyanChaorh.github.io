"use strict";

$(window).mousemove(function (e) {
  // values: e.clientX, e.clientY, e.pageX, e.pageY
  $(".mouseCircle").css("left", e.pageX + 'px').css("top", e.pageY + 'px');
  console.log(e.pageX, e.pageY);
});
$(window).scroll(function (evt) {
  if ($(window).scrollTop() > 850) {
    $(".navbar,progress").removeClass("onOff");
    $(".navbar").addClass("bg-light");
    $(".navbar").addClass("navbar-light ");
  } else {
    $(".navbar,progress").addClass("onOff");
    $(".navbar").removeClass("bg-light");
    $(".navbar").removeClass("navbar-light ");
  }
});