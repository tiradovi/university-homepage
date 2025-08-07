let slideIndex = 0;
let timer;

const slideWrap = $(".slide-wrap");
const slideWidth = $(".slide").width();
const slideCount = $(".slide").length;
const logoImg = $("#university-logo");

$(function () {
  initSlider();
  setupNavToggle();
  setupResizeHandler();
  applyLogoByMode();

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      applyLogoByMode();
    });
});

// 슬라이드 초기화
function initSlider() {
  slideWrap.append($(".slide:first").clone());
  $("#next").click(() => moveSlide(1));
  $("#prev").click(() => moveSlide(-1));
  timer = setInterval(() => moveSlide(1), 3000);
}

function moveSlide(direction) {
  slideIndex += direction;
  slideWrap.stop(true, true).animate(
    {
      marginLeft: -slideIndex * slideWidth,
    },
    500,
    function () {
      if (slideIndex >= slideCount) {
        slideIndex = 0;
        slideWrap.css("margin-left", 0);
      } else if (slideIndex < 0) {
        slideIndex = slideCount - 1;
        slideWrap.css("margin-left", -slideIndex * slideWidth);
      }
    }
  );
}

function setupNavToggle() {
  $(".nav-toggle").click(() => {
    if ($(window).width() <= 768) {
      $(".nav-menu").slideToggle(300);
    }
  });
}

function setupResizeHandler() {
  $(window)
    .resize(() => {
      const windowWidth = $(window).width();

      if (windowWidth > 768) {
        $(".nav-menu").addClass("desktop").removeClass("mobile");
      } else {
        $(".nav-menu").addClass("mobile").removeClass("desktop");
      }
    })
    .trigger("resize");
}

// 다크모드/라이트모드에 따른 로고 변경
function applyLogoByMode() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) {
    logoImg.attr("src", "img/namelogo_dark.png");
  } else {
    logoImg.attr("src", "img/namelogo.png");
  }
}
