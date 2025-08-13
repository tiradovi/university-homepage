$(function () {
  // 유효성 검사 함수
  function validateId() {
    const val = $("#inputId").val().trim();
    const regex = /^[a-zA-Z0-9-_]{6,16}$/;
    if (regex.test(val)) {
      $("#idResult")
        .text("사용 가능한 아이디입니다.")
        .removeClass("invalid")
        .addClass("valid");
      return true;
    } else {
      $("#idResult")
        .text("영어, 숫자, -, _ 6~16글자 사이로 작성해주세요.")
        .removeClass("valid")
        .addClass("invalid");
      return false;
    }
  }

  function validatePw() {
    const val = $("#inputPw").val();
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (regex.test(val)) {
      $("#pwResult")
        .text("안전한 비밀번호입니다.")
        .removeClass("invalid")
        .addClass("valid");
      return true;
    } else {
      $("#pwResult")
        .text(
          "영어 대/소문자 + 숫자 + 특수문자(!@#$%^&*) 포함 8~20자로 작성해주세요."
        )
        .removeClass("valid")
        .addClass("invalid");
      return false;
    }
  }

  function validatePwCheck() {
    const pw = $("#inputPw").val();
    const pwCheck = $("#inputPwCheck").val();
    if (pwCheck === "") {
      $("#pwCheckResult")
        .text("비밀번호를 먼저 입력해주세요")
        .removeClass("valid")
        .addClass("invalid");
      return false;
    }
    if (pw === pwCheck) {
      $("#pwCheckResult")
        .text("비밀번호가 일치합니다.")
        .removeClass("invalid")
        .addClass("valid");
      return true;
    } else {
      $("#pwCheckResult")
        .text("비밀번호가 일치하지 않습니다.")
        .removeClass("valid")
        .addClass("invalid");
      return false;
    }
  }

  function validateName() {
    const val = $("#inputName").val().trim();
    const regex = /^[가-힣]{2,15}$/;
    if (regex.test(val)) {
      $("#nameResult")
        .text("사용 가능한 이름입니다.")
        .removeClass("invalid")
        .addClass("valid");
      return true;
    } else {
      $("#nameResult")
        .text("한글 2~15자로 작성해주세요.")
        .removeClass("valid")
        .addClass("invalid");
      return false;
    }
  }

  // 입력 실시간 체크
  $("#inputId").on("input", validateId);
  $("#inputPw").on("input", function () {
    validatePw();
    validatePwCheck();
  });
  $("#inputPwCheck").on("input", validatePwCheck);
  $("#inputName").on("input", validateName);

  // 폼 제출
  $("#regist-container").on("submit", function (e) {
    e.preventDefault();

    const idValid = validateId();
    const pwValid = validatePw();
    const pwCheckValid = validatePwCheck();
    const nameValid = validateName();
    const genderChecked = $("input[name='gender']:checked").length > 0;

    if (!genderChecked) {
      alert("성별을 선택해주세요.");
      return;
    }

    if (idValid && pwValid && pwCheckValid && nameValid && genderChecked) {
      alert("회원가입 성공! (실제 가입 로직은 여기에)");
      $(this)[0].reset();

      // 초기 메시지 복원
      $("#idResult")
        .text("영어, 숫자, -, _ 6~16글자 사이로 작성")
        .removeClass("valid invalid");
      $("#pwResult")
        .text("영어 대/소문자 + 숫자 + 특수문자(!@#$%^&*) 포함")
        .removeClass("valid invalid");
      $("#pwCheckResult")
        .text("비밀번호를 먼저 입력해주세요")
        .removeClass("valid invalid");
      $("#nameResult")
        .text("한글 2~15자 (단모음, 단자음 제외)")
        .removeClass("valid invalid");
    } else {
      alert("입력값을 다시 확인해주세요.");
    }
  });
});
