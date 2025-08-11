$(function () {
  $("#logo").click(mainPage);
  $("#login-btn").click(login);
  $("#signup-btn").click(goToSignup);
});

function mainPage() {
  window.close();
  opener.window.location.href = "../index.html";
}

function login() {}

function goToSignup() {
  window.close();
  opener.window.location.href = "register.html";
}
