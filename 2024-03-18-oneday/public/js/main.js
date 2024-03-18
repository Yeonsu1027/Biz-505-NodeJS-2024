document.addEventListener("DOMContentLoaded", () => {
  const std_box = document.querySelector("div.std_table");

  std_box.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "LI") {
      const std_num = target.closest("UL").dataset.stdnum;
      document.location.href = `/${std_num}/detail`;
    } else if (target.tagName === "UL") {
      const std_num = target.dataset.stdnum;
      document.location.href = `/${std_num}/detail`;
    } else if (target.tagName === "BUTTON") {
      const std_num = target.closest("UL").dataset.stdnum;
      if (confirm(`${std_num} 학번 학생정보를 삭제하시겠습니까?`)) {
        document.location.href = `/${std_num}/delete`;
      }
    }
  });
});
