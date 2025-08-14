let slideIndex = 0;
let slideCount;
let slideWidth;
const $slideWrap = $("#slide-wrap");
const slideInterval = 4000;

$(function () {
  initializeSlider();
  noticeSlice();
  $("#next").on("click", () => moveSlide(1));
  $("#prev").on("click", () => moveSlide(-1));
});

function initializeSlider() {
  const $slides = $(".slide");
  slideCount = $slides.length;
  slideWidth = $slides.width();
  $slideWrap.append($slides.first().clone());
  setInterval(() => moveSlide(1), slideInterval);
}

function moveSlide(direction) {
  slideIndex += direction;
  $slideWrap
    .stop(true, true)
    .animate({ marginLeft: -slideIndex * slideWidth }, 500, () => {
      if (slideIndex >= slideCount) {
        slideIndex = 0;
        $slideWrap.css("margin-left", 0);
      } else if (slideIndex < 0) {
        slideIndex = slideCount - 1;
        $slideWrap.css("margin-left", -slideIndex * slideWidth);
      }
    });
}

function noticeSlice() {
  const notices = getStorage("notices");
  const recent = notices.slice(-5).reverse();
  recent.forEach((n, idx) => {
    $("#recent-notices").append(`
      <li>
        <span class="title">${n.title}</span>
        <span class="category">${n.category}</span>
        <span class="date">${n.date}</span>
        <a href="page/notice.html?idx=${notices.indexOf(n)}">보기</a>
      </li>
    `);
  });
}
