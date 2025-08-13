$(function () {
  $("#logo").click(mainPage);
  $("#login-btn").click(login);
  $("#signup-btn").click(goToSignup);
});

function mainPage() {
  window.close();
  opener.window.location.href = "../index.html";
}

function login() {
  const id = $("#user-id").val().trim();
  const pw = $("#user-password").val();

  if (!id || !pw) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");

  const user = userInfo.find((u) => u.id === id && u.pw === pw);

  if (user) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`${user.name}님 환영합니다!`);
    window.close();
    opener.window.location.href = "../index.html"; 
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
}

function goToSignup() {
  window.close();
  opener.window.location.href = "register.html";
}
