let slideIndex = 0;
let slideCount;
let slideWidth;
const $slideWrap = $("#slide-wrap");
const slideInterval = 4000;

$(function () {
  initializeSlider();
  renderNoticePreview();
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

function renderNoticePreview() {
  const notices = getStorage("notices") || [];
  const $noticeList = $(".notice-list");

  if (!$noticeList.length) return;

  $noticeList.empty();

  const recentNotices = notices
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recentNotices.length === 0) {
    $noticeList.html('<li class="no-notice">등록된 공지사항이 없습니다.</li>');
    return;
  }

  recentNotices.forEach((notice) => {
    const shortTitle =
      notice.title.length > 25
        ? notice.title.substring(0, 25) + "..."
        : notice.title;

    $noticeList.append(`
      <li class="notice-item" data-idx="${notices.indexOf(notice)}">
        <span class="notice-category ${notice.category}">${getCategoryName(
      notice.category
    )}</span>
        <a href="#" class="notice-title">${shortTitle}</a>
        
        <span class="notice-date">${notice.date}</span>
      </li>
    `);
  });

  $noticeList
    .off("click", ".notice-item")
    .on("click", ".notice-item", function (e) {
      e.preventDefault();
      const idx = $(this).data("idx");
      window.location.href = `page/notice.html?view=${idx}`;
    });
}

function getCategoryName(category) {
  const categoryNames = {
    academic: "학사",
    event: "행사",
    general: "일반",
    important: "중요",
  };
  return categoryNames[category] || "일반";
}
