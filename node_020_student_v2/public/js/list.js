document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");
  table?.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "TD") {
      // 클릭된 target(TD)을 감싸고 있는 가장 가까운 부모
      const paTR = target.closest("TR"); // 다른 tr선택안되게 내가클릭한거의 tr
      const tds = paTR.querySelectorAll("TD"); //tr안 td전부
      const st_num = tds[1].innerText; // 0번에 seq 넣어뒀으니까 현재 1번이 학번
      //   alert(st_num);
      document.location.href = `/student/${st_num}/detail`; // 주소중간에 학번넣기
    }
  });
});
