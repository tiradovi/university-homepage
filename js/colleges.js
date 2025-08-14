$(function () {
  $(".college-department").click(collegeTab);
  $("[id^='department-']").click(departmentModal);
  $("#department-modal").click(closeModal);
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
  if (!collegeId) return;
  const departmentId = $(this).attr("id").replace("department-", "");
  const departmentName = $(this).text().trim();
  const url = `content/${collegeId}/${departmentId}.html`;

  $("#department-modal").addClass("show");
  $("#department-modal-title").html(`${departmentName}`);

  $("#department-modal-body").load(url, function (response, status) {
    if (status === "error") {
      $("#department-modal-body").html("<p>정보를 불러오는 데 실패했습니다.</p>");
    }
  });
}
function closeModal(e) {
  if (e.target === this || $(e.target).hasClass("department-modal-close")) {
    $(this).removeClass("show");
  }
}
