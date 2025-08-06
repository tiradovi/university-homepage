$(function () {
  const $wrap = $(".slide-wrap");
  const $slides = $(".slide");
  const slideWidth = $(".slide").width();
  let index = 0;
  let timer;

  // 첫 슬라이드 복제 → 맨 뒤에 추가 (무한 루프)
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

  // 자동 슬라이드
  function startAuto() {
    timer = setInterval(nextSlide, 3000);
  }
  function stopAuto() {
    clearInterval(timer);
  }

  // 자동 시작
  startAuto();

  // 마우스 올리면 멈춤, 내리면 다시 시작
  $("#gallery").hover(stopAuto, startAuto);
});
