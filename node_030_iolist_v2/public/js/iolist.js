document.addEventListener("DOMContentLoaded", () => {
  const item_table = document.querySelector("table.iolist");
  const btn_delete = document.querySelector("button.iolist.btn_delete");

  btn_delete?.addEventListener("click", (e) => {
    // ? 가없으면 안됨 삭제버튼이 없는 화면 에서도 작동하려면
    // 없을경우 버튼없으면 아래 디테일 이동도 실행x
    const seq = e.target.dataset.seq;
    if (confirm("삭제할까요?")) {
      document.location.replace(`/iolist/${seq}/delete`);
    }
  });

  item_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const seq = target.closest("TR").dataset.seq;
      //   alert(seq);
      document.location.replace(`/iolist/${seq}/detail`);
    }
  });
});
