$(function () {
  bindCommonEvents();
  updateColorModeLogo();
  watchColorModeChange();
  updateLoginStatus();
  scrollBtn();
  initDarkMode();
});

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getSession(key) {
  return JSON.parse(sessionStorage.getItem(key) || "null");
}
function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function bindCommonEvents() {
  $("#nav-toggle").on("click", toggleNavigation);
  $(document).on("click", "#open-login-popup", openLoginPopupEvent);
  $(document).on("click", "#logout-btn", handleLogout);
  $(document).on("click", "#dark-mode-toggle", toggleDarkMode);
}

function toggleNavigation() {
  $("#nav-menu").toggleClass("mobile-open");
}

function updateColorModeLogo() {
  const isDark = $("body").hasClass("dark-mode");
  const basePath = window.location.pathname.includes("/page/") ? "../" : "";
  $("#university-logo").attr(
    "src",
    `${basePath}img/logo/namelogo${isDark ? "_dark" : ""}.png`
  );
}

function watchColorModeChange() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", updateColorModeLogo);
}
function toggleDarkMode() {
  $("body").toggleClass("dark-mode");

  const isDarkMode = $("body").hasClass("dark-mode");

  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

  updateColorModeLogo();

  const toggleText = $(".toggle-text");
  const toggleIcon = $(".toggle-icon");

  if (isDarkMode) {
    toggleText.text("라이트모드");
    toggleIcon.text("☀️");
  } else {
    toggleText.text("다크모드");
    toggleIcon.text("🌙");
  }
}

function initDarkMode() {
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode === "enabled") {
    $("body").addClass("dark-mode");
    $(".toggle-text").text("라이트모드");
    $(".toggle-icon").text("☀️");
  } else {
    $(".toggle-text").text("다크모드");
    $(".toggle-icon").text("🌙");
  }

  updateColorModeLogo();
}

function openLoginPopupEvent(e) {
  e.preventDefault();
  openLoginPopup();
}
function openLoginPopup() {
  const [w, h] = [500, 600];
  const left = window.screen.width / 2 - w / 2;
  const top = window.screen.height / 2 - h / 2;

  const basePath = window.location.pathname.includes("/page/") ? "" : "page/";
  const loginPopup = window.open(
    `${basePath}login.html`,
    "loginPopup",
    `width=${w},height=${h},top=${top},left=${left},resizable=no,scrollbars=no`
  );

  const timer = setInterval(() => {
    if (loginPopup.closed) {
      clearInterval(timer);
      if (typeof initSession === "function") initSession();
      if (typeof renderNotices === "function") renderNotices();
    }
  }, 500);
}

function receiveLoggedInUser(user) {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  updateLoginStatus();
}

function updateLoginStatus() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  $("#login-area").html(
    loggedInUser
      ? `<a href="#" class="nav-link" id="logout-btn">로그아웃</a>`
      : `<a href="#" class="nav-link" id="open-login-popup">로그인</a>`
  );
}

function handleLogout() {
  sessionStorage.removeItem("loggedInUser");
  location.reload();
}

function scrollBtn() {
  const scrollBtn = $("#scroll-to-top");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      scrollBtn.fadeIn();
    } else {
      scrollBtn.fadeOut();
    }
  });

  scrollBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
}
