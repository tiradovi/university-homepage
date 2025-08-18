let notices = getStorage("notices");

const noticeList = $("#notice-list");
const modal = $("#notice-modal");

const noticesPerPage = 10;
let currentPage = 1;

$(function () {
  const currentUser = getSession("loggedInUser");
  if (currentUser) $("#add-notice-btn").show();
  renderNotices();
  bindModalEvents();

  $("#add-notice-btn").on("click", () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      openLoginPopup();
      renderNotices();
    } else {
      openNoticeModal();
    }
  });

  $(".category-btn").on("click", function () {
    $(".category-btn").removeClass("active");
    $(this).addClass("active");
    currentPage = 1;
    renderNotices();
  });

  $("#search-btn").on("click", function () {
    currentPage = 1;
    renderNotices();
  });

  noticeList.on("click", ".view-btn", function () {
    viewNotice($(this).data("idx"));
  });
  noticeList.on("click", ".edit-btn", function () {
    editNotice($(this).data("idx"));
  });
  noticeList.on("click", ".delete-btn", function () {
    deleteNotice($(this).data("idx"));
  });
});

function bindModalEvents() {
  $("#notice-modal-close, #notice-modal").on("click", function (e) {
    if (e.target === this) closeModal();
  });

  $(document).on("keyup.noticeModal", function (e) {
    if (e.key === "Escape") closeModal();
  });
}

function closeModal() {
  modal.fadeOut(200);
  $("#notice-title, #notice-content").val("");
  $("#notice-category").val("academic");
  $("#notice-detail").remove();
}

function renderNotices() {
  const currentUser = getSession("loggedInUser");
  noticeList.empty();
  $("#pagination").remove();

  const filter = {
    category: $(".category-btn.active").data("category") || "all",
    title: $("#search-title").val().trim(),
    date: $("#search-date").val(),
  };

  const filtered = notices.filter((n) => {
    return (
      (filter.category === "all" || n.category === filter.category) &&
      (!filter.title || n.title.includes(filter.title)) &&
      (!filter.date || n.date === filter.date)
    );
  });

  const totalPages = Math.ceil(filtered.length / noticesPerPage) || 1;
  const start = (currentPage - 1) * noticesPerPage;

  filtered.slice(start, start + noticesPerPage).forEach((n, idx) => {
    noticeList.append(`
<tr>
  <td>${start + idx + 1}</td>
  <td>${n.title}</td>
  <td>${n.category}</td>
  <td>${n.author}</td>
  <td>${n.date}</td>
  <td>
    <button class="view-btn" data-idx="${notices.indexOf(n)}">보기</button>
  ${
    currentUser
      ? `<button class="edit-btn" data-idx="${notices.indexOf(n)}">수정</button>
  <button class="delete-btn" data-idx="${notices.indexOf(n)}">삭제</button>`
      : ""
  }
  </td>
</tr>`);
  });
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pagination = $('<div id="pagination" class="pagination"></div>');
  for (let i = 1; i <= totalPages; i++) {
    const btn = $(`<button class="page-btn">${i}</button>`);
    if (i === currentPage) btn.addClass("active");
    btn.on("click", () => {
      currentPage = i;
      renderNotices();
    });
    pagination.append(btn);
  }
  $(".notice-container").append(pagination);
}
function viewNotice(idx) {
  openNoticeModal(notices[idx], idx, "view");
}
function editNotice(idx) {
  openNoticeModal(notices[idx], idx, "edit");
}
function deleteNotice(idx) {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  notices.splice(idx, 1);
  setStorage("notices", notices);
  renderNotices();
}
function openNoticeModal(notice, idx, mode) {
  const currentUser = getSession("loggedInUser");
  const $title = $("#notice-title");
  const $content = $("#notice-content");
  const $category = $("#notice-category");

  $title.val(notice?.title || "");
  $content.val(notice?.content || "");
  $category.val(notice?.category || "academic");

  if (mode === "view") {
    $title.prop("readonly", true);
    $content.prop("readonly", true);
    $category.prop("disabled", true);
    $("#save-notice-btn").hide();
  } else {
    $title.prop("readonly", false);
    $content.prop("readonly", false);
    $category.prop("disabled", false);
    $("#save-notice-btn").show();
  }

  modal.fadeIn(200);

  if (mode !== "view") {
    $("#save-notice-btn")
      .off("click")
      .on("click", function () {
        if (!currentUser) {
          alert("로그인이 필요합니다.");
          return;
        }

        const title = $title.val().trim();
        const content = $content.val().trim();
        const category = $category.val();
        if (!title || !content) return alert("제목과 내용을 입력해주세요.");

        const newNotice = {
          title,
          content,
          category,
          author: currentUser.name,
          date: new Date().toISOString().slice(0, 10),
        };

        if (idx !== null) {
          notices[idx] = { ...notice, ...newNotice };
        } else {
          notices.push(newNotice);
        }

        setStorage("notices", notices);
        renderNotices();
        closeModal();
      });
  }
}
