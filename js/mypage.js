$(function () {
  initSession();
  initProfileUpload();
  initPasswordChange();

  $("#extend-btn").on("click", handleExtendSession);
  $("#logout-btn").on("click", handleLogout);
});

// ===== 세션 초기화 (mypage 전용) =====
function initSession() {
  const sessionUser = getSession("loggedInUser");
  if (!sessionUser) return openLoginPopup();

  if (!sessionUser.ip) sessionUser.ip = generateFakeIP();

  const user = getStorage("userInfo").find((u) => u.id === sessionUser.id);
  if (!user) return handleLogout("사용자를 찾을 수 없습니다.");

  displayUserInfo(user, sessionUser);
  startSessionTimer(sessionUser);
}

// ===== 사용자 정보 표시 =====
function displayUserInfo(user, sessionUser) {
  $("#user-name").text(user.name);
  $("#user-id").text(user.id);
  $("#user-gender").text(user.gender);

  const lastLoginDate = new Date(sessionUser.loginTime);
  $("#last-login-time").text(
    `${lastLoginDate.getFullYear()}-${
      lastLoginDate.getMonth() + 1
    }-${lastLoginDate.getDate()} ${lastLoginDate.getHours()}:${lastLoginDate.getMinutes()}:${lastLoginDate.getSeconds()}`
  );
  $("#last-login-ip").text(sessionUser.ip || "알 수 없음");
}

// ===== 프로필 업로드 =====
function initProfileUpload() {
  const $profileInput = $("#profile-img");
  const $profilePreview = $("#profile-preview");
  const user = getSession("loggedInUser");
  if (user?.profileImage) $profilePreview.attr("src", user.profileImage);

  $profileInput.on("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      $profilePreview.attr("src", e.target.result);
      user.profileImage = e.target.result;
      setSession("loggedInUser", user);

      const allUsers = getStorage("userInfo");
      const index = allUsers.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        allUsers[index].profileImage = e.target.result;
        setStorage("userInfo", allUsers);
      }
    };
    reader.readAsDataURL(file);
  });
}

// ===== 비밀번호 변경 =====
function initPasswordChange() {
  const users = getStorage("users");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  $("#change-password-btn").on("click", () => {
    toggleSections("#current-password-section", "#new-password-section");
    hideErrors();
  });

  $("#verify-current-password").on("click", () => {
    const currentPassword = $("#current-password").val();
    if (currentPassword === currentUser.password) {
      toggleSections("#new-password-section", "#current-password-section");
    } else {
      $("#current-password-error").show();
    }
  });

  $("#update-password").on("click", () => {
    const newPassword = $("#new-password").val();
    const confirmPassword = $("#confirm-password").val();
    if (newPassword && newPassword === confirmPassword) {
      currentUser.password = newPassword;

      const updatedUsers = users.map((u) =>
        u.email === currentUser.email ? { ...u, password: newPassword } : u
      );
      setStorage("users", updatedUsers);
      setStorage("currentUser", currentUser);

      alert("비밀번호가 성공적으로 변경되었습니다!");
      resetPasswordFields();
    } else {
      $("#new-password-error").show();
    }
  });
}

// ===== UI 유틸 =====
function toggleSections(show, hide) {
  $(show).show();
  $(hide).hide();
}
function hideErrors() {
  $("#current-password-error, #new-password-error").hide();
}
function resetPasswordFields() {
  $("#new-password, #confirm-password, #current-password").val("");
  $("#new-password-section").hide();
}
function handleExtendSession() {
  const sessionUser = getSession("loggedInUser");
  if (!sessionUser) return;
  sessionUser.loginTime = Date.now();
  setSession("loggedInUser", sessionUser);
  if (typeof sessionDuration !== "undefined") sessionDuration = 30 * 60 * 1000;
  location.reload();
}

let sessionTimerInterval;
let sessionDuration = 30 * 60 * 1000;
function startSessionTimer(sessionUser, displaySelector = "#timer") {
  sessionTimerInterval = setInterval(() => {
    const remaining = sessionDuration - (Date.now() - sessionUser.loginTime);
    if (remaining > 0) {
      const min = Math.floor(remaining / 60000);
      const sec = Math.ceil((remaining % 60000) / 1000);
      $(displaySelector).text(`${min}분 ${sec}초`);
    } else {
      clearInterval(sessionTimerInterval);
      handleLogout("세션이 만료되어 자동 로그아웃됩니다.");
    }
  }, 1000);
}

function generateFakeIP() {
  return `${rand255()}.${rand255()}.${rand255()}.${rand255()}`;
}
function rand255() {
  return Math.floor(Math.random() * 256);
}
