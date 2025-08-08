$(function () {
  $(".tab-btn").click(introduceMenuTab);
  $(".intro-title-btn").click(introTitleTab);
  
});

function introduceMenuTab() {
  const target = $(this).data("tab");

  $(".tab-btn").removeClass("active");
  $(this).addClass("active");

  $(".tab-content").removeClass("active");
  $("#" + target).addClass("active");
}

function introTitleTab() {
  {
    const index = $(this).data("index");

    $(".intro-title-btn").removeClass("active");
    $(this).addClass("active");

    $(".intro-content").removeClass("active");
    $(".intro-content").eq(index).addClass("active");
  }
}
