$(function () {
  $("#input-id").on("input", () =>
    validateField("id", $("#input-id").val().trim())
  );

  $("#id-check-btn").click(validateIdCheck);

  $("#input-pw").on("input", () => {
    validateField("pw", $("#input-pw").val());
    validatePwCheck();
  });
  $("#input-pw-check").on("input", validatePwCheck);
  $("#input-name").on("input", () =>
    validateField("name", $("#input-name").val().trim())
  );
  $("#signup-btn").on("click", handleSubmit);
});

// ===== 유효성 검사 규칙 =====
const validators = {
  id: {
    regex: /^[0-9]{8,12}$/,
    msgValid: "사용 가능한 아이디입니다.",
    msgInvalid: "숫자 8~12글자 사이로 작성해주세요!!",
    selector: "#id-result",
  },
  pw: {
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    msgValid: "사용 가능한 비밀번호입니다.",
    msgInvalid: "영문자 + 숫자 포함 8~20자로 작성해주세요!!",
    selector: "#pw-result",
  },
  name: {
    regex: /^[가-힣]{2,15}$/,
    msgValid: "사용 가능한 이름입니다.",
    msgInvalid: "한글 2~15자로 작성해주세요!!",
    selector: "#name-result",
  },
};

// ===== 유효성 검사 함수 =====
function validateField(type, value) {
  const { regex, msgValid, msgInvalid, selector } = validators[type];
  const isValid = regex.test(value);
  $(selector)
    .text(isValid ? msgValid : msgInvalid)
    .removeClass("valid invalid")
    .addClass(isValid ? "valid" : "invalid");
  return isValid;
}

function validatePwCheck() {
  const pw = $("#input-pw").val();
  const pwCheck = $("#input-pw-check").val();
  let msg, valid;
  if (!pwCheck) {
    msg = "비밀번호를 먼저 입력해주세요";
    valid = false;
  } else if (pw === pwCheck) {
    msg = "비밀번호가 일치합니다.";
    valid = true;
  } else {
    msg = "비밀번호가 일치하지 않습니다.";
    valid = false;
  }
  $("#pw-check-result")
    .text(msg)
    .removeClass("valid invalid")
    .addClass(valid ? "valid" : "invalid");
  return valid;
}
function validateIdCheck() {
  const userId = $("#input-id").val().trim();
  let userlist = JSON.parse(localStorage.getItem("userInfo") || "[]");
  const isDup = userlist.some((user) => user.id === userId);

  if (isDup) {
    $("#id-result").text("이미 사용 중인 아이디입니다.").css("color", "red");
    return false;
  } else {
    $("#id-result").text("사용 가능한 아이디입니다.").css("color", "green");
    return true;
  }
}

function handleSubmit(e) {
  e.preventDefault();

  let userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");

  const idValid = validateField("id", $("#input-id").val().trim());
  const idCheckValid = validateIdCheck();
  const pwValid = validateField("pw", $("#input-pw").val());
  const pwCheckValid = validatePwCheck();
  const nameValid = validateField("name", $("#input-name").val().trim());
  const genderChecked = $("input[name='gender']:checked").val();

  if (
    idValid &&
    idCheckValid &&
    pwValid &&
    pwCheckValid &&
    nameValid &&
    genderChecked
  ) {
    const user = {
      id: $("#input-id").val().trim(),
      pw: $("#input-pw").val(),
      name: $("#input-name").val().trim(),
      gender: genderChecked,
    };

    userInfo.push(user);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("회원가입 성공! 마이페이지로 이동합니다.");
    location.href = "mypage.html";

    $("#regist-container")[0].reset();
    $(".input-result").removeClass("valid invalid");
  } else {
    alert("입력값을 다시 확인해주세요.");
  }
}
