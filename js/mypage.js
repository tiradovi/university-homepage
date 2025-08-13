$(function () {
  checkLogin();
  $("#extend-btn").click(extendSession);
  initProfileUpload();
});

let sessionTimerInterval;
let sessionDuration = 30 * 60 * 1000;

function initProfileUpload() {
  const profileInput = $("#profile-img");
  const profilePreview = $("#profile-preview");

  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (user && user.profileImage) {
    profilePreview.attr("src", user.profileImage);
  }

  profileInput.on("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      profilePreview.attr("src", e.target.result);

      user.profileImage = e.target.result;
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));

      const allUsers = JSON.parse(localStorage.getItem("userInfo") || "[]");
      const index = allUsers.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        allUsers[index].profileImage = e.target.result;
        localStorage.setItem("userInfo", JSON.stringify(allUsers));
      }
    };
    reader.readAsDataURL(file);
  });
}

function checkLogin() {
  const sessionUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!sessionUser) return openLoginPopup();

  if (!sessionUser.ip) sessionUser.ip = generateFakeIP();
  const user = getUserFromLocal(sessionUser.id);
  if (!user) return logoutFn("사용자를 찾을 수 없습니다.");

  displayUserInfo(user, sessionUser);
  startSessionTimer(sessionUser);

  $("#logout-btn").click(() => {
    clearInterval(sessionTimerInterval);
    logoutFn();
  });
}
function openLoginPopup() {
  alert("로그인이 필요한 서비스입니다.");
  const [w, h] = [500, 600];
  const [left, top] = [
    window.screen.width / 2 - w / 2,
    window.screen.height / 2 - h / 2,
  ];

  const loginPopup = window.open(
    "login.html",
    "loginPopup",
    `width=${w},height=${h},top=${top},left=${left},resizable=no,scrollbars=no`
  );

  const timer = setInterval(() => {
    if (loginPopup.closed) {
      clearInterval(timer);
      checkLogin();
    }
  }, 500);
}
function getUserFromLocal(id) {
  const allUsers = JSON.parse(localStorage.getItem("userInfo") || "[]");
  return allUsers.find((u) => u.id === id);
}
function displayUserInfo(user, sessionUser) {
  $("#user-name").text(user.name);
  $("#user-id").text(user.id);
  $("#user-gender").text(user.gender);
  const lastLoginDate = new Date(sessionUser.loginTime);
  $("#last-login-time").text(
    `${lastLoginDate.getFullYear()}-${
      lastLoginDate.getMonth() + 1
    }-${lastLoginDate.getDate()} 
     ${lastLoginDate.getHours()}:${lastLoginDate.getMinutes()}:${lastLoginDate.getSeconds()}`
  );

  $("#last-login-ip").text(sessionUser.ip || "알 수 없음");
}
function startSessionTimer(sessionUser) {
  sessionTimerInterval = setInterval(() => {
    const remaining =
      sessionDuration - (new Date().getTime() - sessionUser.loginTime);
    if (remaining > 0) {
      const min = Math.floor(remaining / 60000);
      const sec = Math.ceil((remaining % 60000) / 1000);
      $("#timer").text(`${min}분 ${sec}초`);
    } else {
      clearInterval(sessionTimerInterval);
      logoutFn("세션이 만료되어 자동 로그아웃됩니다.");
    }
  }, 1000);
}
function logoutFn(msg = "로그아웃 되었습니다.") {
  sessionStorage.removeItem("loggedInUser");
  alert(msg);
  location.reload();
}
function extendSession() {
  const sessionUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!sessionUser) return;

  sessionUser.loginTime = new Date().getTime();
  sessionStorage.setItem("loggedInUser", JSON.stringify(sessionUser));
  sessionDuration = 30 * 60 * 1000;
  location.reload();
}
function generateFakeIP() {
  return `${rand255()}.${rand255()}.${rand255()}.${rand255()}`;
}
function rand255() {
  return Math.floor(Math.random() * 256);
}
