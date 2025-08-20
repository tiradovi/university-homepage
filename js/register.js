$(function () {
  let isIdChecked = false;

  $("#input-id").on("input", () => {
    isIdChecked = false;
    validateField("id", $("#input-id").val().trim());
  });

  $("#id-check-btn").click(validateIdCheck);

  $("#input-pw").on("input", () => {
    validateField("pw", $("#input-pw").val());
    validatePwCheck();
  });

  $("#input-pw-check").on("input", validatePwCheck);

  $("#input-name").on("input", () =>
    validateField("name", $("#input-name").val().trim())
  );

  $("input[name='gender']").on("change", validateGender);

  $("#signup-btn").on("click", handleSubmit);
});

const validators = {
  id: {
    regex: /^[0-9]{8,12}$/,
    msgValid: "사용 가능한 아이디입니다.",
    msgInvalid: "숫자 8~12글자 사이로 작성해주세요.",
    selector: "#id-result",
  },
  pw: {
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    msgValid: "사용 가능한 비밀번호입니다.",
    msgInvalid: "영문자 + 숫자 포함 8~20자로 작성해주세요.",
    selector: "#pw-result",
  },
  name: {
    regex: /^[가-힣]{2,15}$/,
    msgValid: "사용 가능한 이름입니다.",
    msgInvalid: "한글 2~15자로 작성해주세요.",
    selector: "#name-result",
  },
};

function validateField(type, value) {
  const { regex, msgValid, msgInvalid, selector } = validators[type];

  if (!value) {
    $(selector).text(getDefaultMessage(type)).removeClass("valid invalid");
    return false;
  }

  const isValid = regex.test(value);
  $(selector)
    .text(isValid ? msgValid : msgInvalid)
    .removeClass("valid invalid")
    .addClass(isValid ? "valid" : "invalid");
  return isValid;
}

function getDefaultMessage(type) {
  const defaultMessages = {
    id: "숫자 8~12글자 사이로 작성해주세요.",
    pw: "영문자 + 숫자 포함 8~20자로 작성해주세요.",
    name: "한글 2~15자로 작성해주세요.",
  };
  return defaultMessages[type];
}

function validatePwCheck() {
  const pw = $("#input-pw").val();
  const pwCheck = $("#input-pw-check").val();
  let msg, valid;

  if (!pw) {
    msg = "비밀번호를 먼저 입력해주세요.";
    valid = false;
  } else if (!pwCheck) {
    msg = "비밀번호 확인을 입력해주세요.";
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

  if (!validateField("id", userId)) {
    alert("올바른 아이디 형식을 입력해주세요.");
    return false;
  }

  let userlist = JSON.parse(localStorage.getItem("userInfo") || "[]");
  const isDup = userlist.some((user) => user.id === userId);

  if (isDup) {
    $("#id-result")
      .text("이미 사용 중인 아이디입니다.")
      .removeClass("valid invalid")
      .addClass("invalid");
    isIdChecked = false;
    return false;
  } else {
    $("#id-result")
      .text("사용 가능한 아이디입니다.")
      .removeClass("valid invalid")
      .addClass("valid");
    isIdChecked = true;
    return true;
  }
}

function validateGender() {
  const isSelected = $("input[name='gender']:checked").length > 0;

  const $genderResult = $("#gender-result");
  if ($genderResult.length) {
    if (isSelected) {
      $genderResult
        .text("성별이 선택되었습니다.")
        .removeClass("valid invalid")
        .addClass("valid");
    } else {
      $genderResult
        .text("성별을 선택해주세요.")
        .removeClass("valid invalid")
        .addClass("invalid");
    }
  }

  return isSelected;
}

function handleSubmit(e) {
  e.preventDefault();

  let userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");

  const idValid = validateField("id", $("#input-id").val().trim());
  const pwValid = validateField("pw", $("#input-pw").val());
  const pwCheckValid = validatePwCheck();
  const nameValid = validateField("name", $("#input-name").val().trim());
  const genderValid = validateGender();

  if (idValid && !isIdChecked) {
    alert("아이디 중복 확인을 해주세요.");
    $("#id-check-btn").focus();
    return;
  }

  if (
    idValid &&
    isIdChecked &&
    pwValid &&
    pwCheckValid &&
    nameValid &&
    genderValid
  ) {
    try {
      const user = {
        id: $("#input-id").val().trim(),
        pw: $("#input-pw").val(),
        name: $("#input-name").val().trim(),
        gender: $("input[name='gender']:checked").val(),
        registDate: new Date().toISOString(),
      };

      userInfo.push(user);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      alert("회원가입이 완료되었습니다! 메인페이지로 이동합니다.");
      location.href = "../index.html";
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  } else {
    let errorMsg = "다음 항목을 확인해주세요:\n";
    if (!idValid) errorMsg += "- 아이디 형식\n";
    if (idValid && !isIdChecked) errorMsg += "- 아이디 중복 확인\n";
    if (!pwValid) errorMsg += "- 비밀번호 형식\n";
    if (!pwCheckValid) errorMsg += "- 비밀번호 확인\n";
    if (!nameValid) errorMsg += "- 이름 형식\n";
    if (!genderValid) errorMsg += "- 성별 선택\n";

    alert(errorMsg);
  }
}

$(document).ready(function () {
  $("#id-result").text("숫자 8~12글자 사이로 작성해주세요.");
  $("#pw-result").text("영문자 + 숫자 포함 8~20자로 작성해주세요.");
  $("#pw-check-result").text("비밀번호를 먼저 입력해주세요.");
  $("#name-result").text("한글 2~15자로 작성해주세요.");
});
