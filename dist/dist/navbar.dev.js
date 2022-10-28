"use strict";

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
var s = skrollr.init();