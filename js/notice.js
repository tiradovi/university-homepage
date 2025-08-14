let notices = JSON.parse(localStorage.getItem("notices") || "[]");
const currentUser = JSON.parse(
  sessionStorage.getItem("loggedInUser") || "null"
);

const noticeListEl = document.getElementById("notice-list");
const addNoticeBtn = document.getElementById("add-notice-btn");
const modal = document.getElementById("notice-modal");
const closeModal = modal.querySelector(".close");

if (currentUser) {
  addNoticeBtn.style.display = "block"; 
}

function renderNotices(filter = {}) {
  noticeListEl.innerHTML = "";

  const filtered = notices.filter((n) => {
    let match = true;
    if (filter.category && filter.category !== "all")
      match = match && n.category === filter.category;
    if (filter.title) match = match && n.title.includes(filter.title);
    if (filter.date) match = match && n.date === filter.date;
    return match;
  });

  filtered.forEach((n, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${n.title}</td>
      <td>${n.category}</td>
      <td>${n.author}</td>
      <td>${n.date}</td>
      <td>
        ${
          currentUser
            ? `<button onclick="editNotice(${idx})">수정</button>
        <button onclick="deleteNotice(${idx})">삭제</button>`
            : ""
        }
      </td>
    `;
    noticeListEl.appendChild(tr);
  });
}

addNoticeBtn.addEventListener("click", () => {
  if (!currentUser) return alert("로그인이 필요합니다.");
  modal.style.display = "block";
});

document.getElementById("save-notice-btn").addEventListener("click", () => {
  const title = document.getElementById("notice-title").value;
  const content = document.getElementById("notice-content").value;
  const category = document.getElementById("notice-category").value;
  const date = new Date().toISOString().split("T")[0];

  notices.push({ title, content, category, author: currentUser.id, date });
  localStorage.setItem("notices", JSON.stringify(notices));
  modal.style.display = "none";
  renderNotices();
});


renderNotices();


document.querySelectorAll(".category-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderNotices({ category: btn.dataset.category });
  })
);


document.getElementById("search-btn").addEventListener("click", () => {
  const title = document.getElementById("search-title").value.trim();
  const date = document.getElementById("search-date").value;
  renderNotices({ title, date });
});

function editNotice(idx) {
  const n = notices[idx];
  modal.style.display = "block";
  document.getElementById("notice-title").value = n.title;
  document.getElementById("notice-content").value = n.content;
  document.getElementById("notice-category").value = n.category;

}
function deleteNotice(idx) {
  if (confirm("정말 삭제하시겠습니까?")) {
    notices.splice(idx, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    renderNotices();
  }
}
