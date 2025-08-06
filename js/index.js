let index = 0;
let timer;

$(function () {
  const $wrap = $(".slide-wrap");
  const $slides = $(".slide");
  const slideWidth = $(".slide").width();

  $wrap.append($slides.first().clone());

  // 다음 버튼
  $("#next").click(nextSlide);
  // 이전 버튼
  $("#prev").click(prevSlide);

  function nextSlide() {
    index++;
    $wrap.animate({ marginLeft: -index * slideWidth }, 500, function () {
      if (index === $wrap.children().length - 1) {
        index = 0;
        $wrap.css("margin-left", 0);
      }
    });
  }

  function prevSlide() {
    if (index === 0) {
      index = $wrap.children().length - 1;
      $wrap.css("margin-left", -index * slideWidth);
    }
    index--;
    $wrap.animate({ marginLeft: -index * slideWidth }, 500);
  }

  function startAuto() {
    timer = setInterval(nextSlide, 3000);
  }
  startAuto();
});
