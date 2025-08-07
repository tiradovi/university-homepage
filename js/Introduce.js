$(function () {
  $(".tab-btn").click(function () {
    const target = $(this).data("tab");

    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").removeClass("active");
    $("#" + target).addClass("active");
  });
});

