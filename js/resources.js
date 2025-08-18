let resourcesData = [];
let categoryColors = {};
let fileTypeIcons = {};

let currentCategory = "전체",
  searchTerm = "";

$(function () {
  $.get("../json/resources.json")
    .done((data) => {
      resourcesData = data.resources || [];
      fileTypeIcons = data.fileTypes || {};
      (data.categories || []).forEach(
        (c) => (categoryColors[c.name] = c.color)
      );
      renderResourcesList();
    })
    .fail(() => alert("데이터를 불러오는 중 오류가 발생했습니다."));

  $("#resources-container")
    .on("click", ".category-btn", function () {
      $(".category-btn").removeClass("active");
      $(this).addClass("active");
      currentCategory = $(this).data("category");
      renderResourcesList();
    })
    .on("input", "#search-input", function () {
      searchTerm = $(this).val().toLowerCase();
      renderResourcesList();
    })
    .on("change", "#sort-select", renderResourcesList)
    .on("click", ".download-btn", function () {
      const resourceId = +$(this).data("id");
      const resource = resourcesData.find((resources) => resources.id === resourceId);
      if (!resource) return alert("파일을 찾을 수 없습니다.");

      resource.downloadCount++;
      $(this).prop("disabled", true).html("⏳ 다운로드 중...");
      $(`.resources-list .resource-card[data-id="${resourceId}"] .meta-value`)
        .last()
        .text(`${resource.downloadCount.toLocaleString()}회`);

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = `../files/example.txt`;
        link.download = "example.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        $(this).prop("disabled", false).html("⬇️ 다운로드");
      }, 1500);
    });
});

function renderResourcesList() {
  const filtered = resourcesData.filter(
    (resources) =>
      (currentCategory === "전체" || resources.category === currentCategory) &&
      (resources.title.toLowerCase().includes(searchTerm) ||
        resources.description.toLowerCase().includes(searchTerm))
  );

  const sortType = $("#sort-select").val() || "latest";
  filtered.sort((a, b) => {
    if (sortType === "latest")
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    if (sortType === "popular") return b.downloadCount - a.downloadCount;
    if (sortType === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  const listHTML = `
    <div class="resources-list">
      <div class="resources-count">총 <strong>${
        filtered.length
      }</strong>개의 자료</div>
      <div class="resources-grid">
        ${filtered
          .map(
            (resources) => `
          <div class="resource-card" data-id="${resources.id}">
            <div class="card-header">
              <div class="file-info">
                <span class="file-icon">${
                  fileTypeIcons[resources.fileType] || "📄"
                }</span>
                <span class="file-type">${resources.fileType}</span>
              </div>
              <span class="category-tag" style="background-color: ${
                categoryColors[resources.category] || "#666"
              }">${resources.category}</span>
            </div>
            <div class="card-content">
              <h3 class="resource-title">${resources.title}</h3>
              <p class="resource-description">${resources.description}</p>
              <div class="resource-meta">
                <div class="meta-row"><span class="meta-label">파일크기:</span> <span class="meta-value">${
                  resources.fileSize
                }</span></div>
                <div class="meta-row"><span class="meta-label">업로드:</span> <span class="meta-value">${
                  resources.uploadDate
                }</span></div>
                <div class="meta-row"><span class="meta-label">다운로드:</span> <span class="meta-value">${resources.downloadCount.toLocaleString()}회</span></div>
              </div>
            </div>
            <div class="card-footer">
              <button class="download-btn" data-id="${
                resources.id
              }">⬇️ 다운로드</button>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>`;

  $(".resources-list").remove();
  $("#resources-container").append(listHTML);
}
