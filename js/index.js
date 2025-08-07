let slideIndex = 0;
let timer;

const slideWrap = $(".slide-wrap");
const slideWidth = $(".slide").width();
const slideCount = $(".slide").length;

$(function () {
  initSlider();
});

function initSlider() {
  slideWrap.append($(".slide:first").clone()); 
  $("#next").click(() => moveSlide(1));
  $("#prev").click(() => moveSlide(-1));
  timer = setInterval(() => moveSlide(1), 3000);
}


function moveSlide(direction) {
  slideIndex += direction;
  slideWrap
    .stop(true, true)
    .animate({ marginLeft: -slideIndex * slideWidth }, 500, function () {
      if (slideIndex >= slideCount) {
        slideIndex = 0;
        slideWrap.css("margin-left", 0);
      }
      if (slideIndex < 0) {
        slideIndex = slideCount - 1;
        slideWrap.css("margin-left", -slideIndex * slideWidth);
      }
    });
}

