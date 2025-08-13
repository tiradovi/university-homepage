
$(function () {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    alert("로그인이 필요한 서비스입니다.");
    location.href = "login.html"; 
  } else {

    $("#user-name").text(loggedInUser.name);
  }
});
