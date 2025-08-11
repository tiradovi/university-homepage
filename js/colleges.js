$(function () {
  $(".college-department").click(collegeTab);
  $("[id^='department-']").click(departmentModal);
  $("#modal-close").click(() => $("#department-modal").removeClass("show"));
  $("#department-modal").click(function (e) {
    if (this === e.target) {
      $(this).removeClass("show");
    }
  });
});

function collegeTab() {
  const targetId = $(this).data("college");

  $(".department-list")
    .not("#" + targetId)
    .removeClass("active");

  $("#" + targetId).toggleClass("active");
}

function departmentModal() {
  const collegeId = $(this).closest(".department-list").attr("id");
  const departmentId = $(this).attr("id").replace("department-", "");

  const url = `content/${collegeId}/${departmentId}.html`;

  $("#modal-body").html("<p>로딩 중...</p>");
  $("#department-modal").addClass("show");

  $("#modal-body").load(url, function (response, status) {
    if (status === "error") {
      $("#modal-body").html("<p>정보를 불러오는 데 실패했습니다.</p>");
    }
  });
}
