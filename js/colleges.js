$(function () {
  $(".college-department").click(collegeTab);
});

function collegeTab() {
  const targetId = $(this).data("college");

  // 다른 리스트는 active 클래스 제거해서 숨김 처리
  $(".department-list")
    .not("#" + targetId)
    .removeClass("active");

  // 클릭한 대상은 active 토글 (보이기/숨기기)
  $("#" + targetId).toggleClass("active");
}
