let sessionTimerInterval;
let sessionDuration = 30 * 60 * 1000;

$(function () {
  initSession();
  initProfileUpload();
  passwordChange();

  $("#extend-btn").on("click", handleExtendSession);
  $("#logout-btn").on("click", handleLogout);
});

function initSession() {
  const sessionUser = getSession("loggedInUser");
  if (!sessionUser) return openLoginPopup();

  if (!sessionUser.ip) sessionUser.ip = generateFakeIP();

  const user = getStorage("userInfo").find((u) => u.id === sessionUser.id);
  if (!user) return handleLogout("사용자를 찾을 수 없습니다.");

  displayUserInfo(user, sessionUser);
  startSessionTimer(sessionUser);
}

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

function initProfileUpload() {
  const profileInput = $("#profile-img");
  const profilePreview = $("#profile-preview");
  const user = getSession("loggedInUser");
  if (user?.profileImage) profilePreview.attr("src", user.profileImage);

  profileInput.on("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePreview.attr("src", e.target.result);
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

function passwordChange() {
  const users = getStorage("userInfo");
  const currentUser = getSession("loggedInUser");

  $("#change-password-btn").on("click", () => {
    toggleClass("#verify-password-btn", "#change-password-btn");
    toggleClass("#current-password-section", "#new-password-section");
  });

  $("#verify-password-btn").on("click", () => {
    let currentPassword = $("#current-password").val();
    if (currentPassword === currentUser.pw) {
      toggleClass("#update-password-btn", "#verify-password-btn");
      toggleClass("#new-password-section", "#current-password-section");
      $("#password-error").removeClass("active");
    } else {
      showPasswordError("비밀번호가 일치하지 않습니다.");
    }
  });

  $("#update-password-btn").on("click", () => {
    let newPassword = $("#new-password").val();
    let confirmPassword = $("#confirm-password").val();
    if (newPassword === confirmPassword) {
      if (!validateField("pw", $("#new-password").val())) {
        showPasswordError(
          "비밀번호는 영문 + 숫자 포함 8~20자로 입력해야 합니다."
        );
      } else {
        currentUser.pw = newPassword;

        const updatedUsers = users.map((u) =>
          u.id === currentUser.id ? { ...u, pw: newPassword } : u
        );
        setStorage("userInfo", updatedUsers);
        setSession("loggedInUser", currentUser);

        toggleClass("#change-password-btn", "#new-password-section");
        $("#new-password, #confirm-password, #current-password").val("");
        $("#password-error").removeClass("active");
        alert("비밀번호가 성공적으로 변경되었습니다!");
      }
    } else {
      showPasswordError("두 비밀번호가 서로 일치하지 않습니다.");
    }
  });
}

function toggleClass(showSelector, hideSelector) {
  $(showSelector).addClass("active");
  $(hideSelector).removeClass("active");
}
function showPasswordError(msg) {
  $("#password-error").text(msg).addClass("active");
}
function handleExtendSession() {
  const sessionUser = getSession("loggedInUser");
  if (!sessionUser) return;
  sessionUser.loginTime = Date.now();
  setSession("loggedInUser", sessionUser);
  if (typeof sessionDuration !== "undefined") sessionDuration = 30 * 60 * 1000;
  location.reload();
}

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
