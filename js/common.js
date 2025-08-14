$(function () {
  bindCommonEvents();
  updateColorModeLogo();
  watchColorModeChange();
  updateLoginStatus();
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
}

function toggleNavigation() {
  $("#nav-menu").toggleClass("mobile-open");
}

function updateColorModeLogo() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
      renderNotices();
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
