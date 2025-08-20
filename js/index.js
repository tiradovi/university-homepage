let slideIndex = 0;
let slideCount;
let slideWidth;
const slideWrap = $("#slide-wrap");
const slideInterval = 4000;
let autoSlideTimer;

$(function () {
  initializeSlider();
  renderNoticePreview();
  bindSliderEvents();
  startAutoSlide();
});

// 슬라이더 초기화
function initializeSlider() {
  const $slides = $(".slide");
  slideCount = $slides.length;

  // 슬라이드 크기 계산
  calculateSlideWidth();

  // 무한 슬라이드를 위한 첫 번째 슬라이드 복제 (마지막에 추가)
  slideWrap.append($slides.first().clone());
}

// 슬라이드 너비 계산 (반응형) - 개선된 버전
function calculateSlideWidth() {
  // 더 정확한 컨테이너 너비 계산
  const $bannerContainer = $(".banner-container");

  // 모바일에서는 뷰포트 너비, 데스크톱에서는 컨테이너 너비
  if ($(window).width() <= 768) {
    slideWidth = $(window).width();
  } else {
    slideWidth = $bannerContainer.width();
  }

  // 정확한 너비로 설정
  $(".slide").each(function () {
    $(this).css({
      width: slideWidth + "px",
      "min-width": slideWidth + "px",
      "max-width": slideWidth + "px",
    });
  });

  // slide-wrap 전체 너비 설정
  const totalWidth = slideWidth * $(".slide").length;
  slideWrap.css("width", totalWidth + "px");

  // 현재 슬라이드 위치로 이동 (애니메이션 없이)
  slideWrap.css("margin-left", -slideIndex * slideWidth + "px");

  // 디버깅용 (나중에 제거 가능)
  console.log(
    "Slide width calculated:",
    slideWidth,
    "Window width:",
    $(window).width()
  );
}

// 슬라이더 이벤트 바인딩
function bindSliderEvents() {
  // 다음 버튼 클릭
  $("#next").on("click", () => {
    stopAutoSlide();
    moveSlide(1);
    startAutoSlide();
  });

  // 이전 버튼 클릭
  $("#prev").on("click", () => {
    stopAutoSlide();
    moveSlide(-1);
    startAutoSlide();
  });

  // 윈도우 리사이즈 이벤트 (반응형 처리) - 디바운스 추가
  let resizeTimeout;
  $(window).on("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      calculateSlideWidth();
    }, 100); // 100ms 디바운스
  });

  // 마우스 호버 시 자동 슬라이드 정지/재시작
  $(".banner-container").on("mouseenter", stopAutoSlide);
  $(".banner-container").on("mouseleave", startAutoSlide);
}

// 슬라이드 이동
function moveSlide(direction) {
  slideIndex += direction;

  slideWrap.stop(true, true).animate(
    {
      marginLeft: -slideIndex * slideWidth + "px",
    },
    500,
    () => {
      handleSlideEnd();
    }
  );
}

// 슬라이드 이동 완료 후 처리
function handleSlideEnd() {
  if (slideIndex >= slideCount) {
    // 마지막 슬라이드(복제된 첫 번째)에서 실제 첫 번째로 이동
    slideIndex = 0;
    slideWrap.css("margin-left", "0px");
  } else if (slideIndex < 0) {
    // 첫 번째 슬라이드에서 뒤로 갈 때 마지막 슬라이드로 이동
    slideIndex = slideCount - 1;
    slideWrap.css("margin-left", -slideIndex * slideWidth + "px");
  }
}

// 자동 슬라이드 시작
function startAutoSlide() {
  stopAutoSlide(); // 기존 타이머 제거
  autoSlideTimer = setInterval(() => moveSlide(1), slideInterval);
}

// 자동 슬라이드 정지
function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

// 공지사항 미리보기 렌더링 (기존과 동일)
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

// 카테고리 이름 반환
function getCategoryName(category) {
  const categoryNames = {
    academic: "학사",
    event: "행사",
    general: "일반",
    important: "중요",
  };
  return categoryNames[category] || "일반";
}