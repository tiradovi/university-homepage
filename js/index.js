let slideIndex = 0;
const slideWrap = $("#slide-wrap");

$(function () {
  initialize();
  $("#nav-toggle").click(navigationToggle);
  $("#open-login-popup").click(openLoginPopup);
  receiveLoggedInUser();
});

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

function openLoginPopup(e) {
  e.preventDefault();

  const popupWidth = 500;
  const popupHeight = 600;

  const left = window.screen.width / 2 - popupWidth / 2;
  const top = window.screen.height / 2 - popupHeight / 2;

  let url;
  if (window.location.pathname.includes("/page/")) {
    url = "login.html";
  } else {
    url = "page/login.html";
  }

  window.open(
    url,
    "loginPopup",
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=no,scrollbars=no`
  );
}
function receiveLoggedInUser(user) {
  // 세션에 저장
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));

  // UI 갱신
  $("#login-area").html(`
    <span>${user.name}님</span>
    <button id="logout-btn" class="logout-btn">로그아웃</button>
  `);

  $("#logout-btn").click(() => {
    sessionStorage.removeItem("loggedInUser");
    alert("로그아웃 되었습니다.");
    location.reload();
  });
}