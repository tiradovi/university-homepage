let slideIndex = 0;

const slideWrap = $("#slide-wrap");

$(function () {
  initialize();
  $("#nav-toggle").click(navigationToggle);
});

// 페이지 초기화
function initialize() {
  initializeSlider();
  colorModeLogoChange();
  colorModeChangeListener();
}

function initializeSlider() {
  slideWrap.append($(".slide:first").clone());
  $("#next").click(() => moveSlide(1));
  $("#prev").click(() => moveSlide(-1));
  setInterval(() => moveSlide(1), 4000);
}

function moveSlide(direction) {
  slideIndex += direction;
  slideWrap.stop(true, true).animate(
    {
      marginLeft: -slideIndex * $(".slide").width(),
    },
    500,
    function () {
      if (slideIndex >= $(".slide").length) {
        slideIndex = 0;
        slideWrap.css("margin-left", 0);
      } else if (slideIndex < 0) {
        slideIndex = $(".slide").length - 1;
        slideWrap.css("margin-left", -slideIndex * $(".slide").width());
      }
    }
  );
}

function navigationToggle() {
  $("#nav-menu").toggleClass("mobile-open");
}

function colorModeLogoChange() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (window.location.pathname.includes("/page/")) {
    $("#university-logo").attr(
      "src",
      isDark ? "../img/logo/namelogo_dark.png" : "../img/logo/namelogo.png"
    );
  } else {
    $("#university-logo").attr(
      "src",
      isDark ? "img/logo/namelogo_dark.png" : "img/logo/namelogo.png"
    );
  }
}

function colorModeChangeListener() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      colorModeLogoChange();
    });
}
