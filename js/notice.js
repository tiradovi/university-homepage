let notices = getStorage("notices");

const noticeList = $("#notice-list");
const modal = $("#notice-modal");

const noticesPerPage = 10;
let currentPage = 1;

$(function () {
  const currentUser = getSession("loggedInUser");
  if (currentUser) $("#add-notice-btn").show();

  renderNotices();

  $("#add-notice-btn").on("click", () => {
    const user = getSession("loggedInUser");
    if (!user) {
      alert("로그인이 필요합니다.");
      openLoginPopup();
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

  $("#notice-modal-close").on("click", closeModal);
  modal.on("click", (e) => {
    if ($(e.target).is(modal)) closeModal();
  });
  $(document).on("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  noticeList.on("click", ".edit-btn", function () {
    editNotice($(this).data("idx"));
  });
  noticeList.on("click", ".delete-btn", function () {
    deleteNotice($(this).data("idx"));
  });
});

function closeModal() {
  modal.fadeOut(200);
  clearNoticeForm();
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

  const filtered = notices.filter(
    (n) =>
      (filter.category === "all" || n.category === filter.category) &&
      (!filter.title || n.title.includes(filter.title)) &&
      (!filter.date || n.date === filter.date)
  );

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
          ${
            currentUser
              ? `
            <button class="edit-btn" data-idx="${notices.indexOf(
              n
            )}">수정</button>
            <button class="delete-btn" data-idx="${notices.indexOf(
              n
            )}">삭제</button>
          `
              : ""
          }
        </td>
      </tr>
    `);
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

function editNotice(idx) {
  const notice = notices[idx];
  if (!notice) return;
  openNoticeModal(notice, idx);
}

function deleteNotice(idx) {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  notices.splice(idx, 1);
  setStorage("notices", notices);
  renderNotices();
}

function openNoticeModal(notice = null, idx = null) {
  const currentUser = getSession("loggedInUser");
  $("#notice-title").val(notice ? notice.title : "");
  $("#notice-content").val(notice ? notice.content : "");
  $("#notice-category").val(notice ? notice.category : "academic");
  modal.fadeIn(200);

  $("#save-notice-btn")
    .off("click")
    .on("click", function () {
      const title = $("#notice-title").val().trim();
      const content = $("#notice-content").val().trim();
      const category = $("#notice-category").val();
      if (!title || !content) return alert("제목과 내용을 입력해주세요.");

      const newNotice = {
        title,
        content,
        category,
        author: currentUser.name,
        date: getTodayDate(),
      };

      if (notice && idx !== null) {
        notices[idx] = { ...notice, ...newNotice };
      } else {
        notices.push(newNotice);
      }

      setStorage("notices", notices);
      renderNotices();
      closeModal();
    });
}

function clearNoticeForm() {
  $("#notice-title, #notice-content").val("");
  $("#notice-category").val("academic");
}

function getTodayDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
