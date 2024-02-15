document.addEventListener("DOMContentLoaded", () => {
  const btn_update = document.querySelector("button.update");
  const btn_delete = document.querySelector("button.delete");

  btn_delete.addEventListener("click", (e) => {
    if (confirm("삭제된 데이터는 복구 할 수 없습니다\n정말 삭제할까요?")) {
      const target = e.target;
      const seq = target.dataset.seq;
      document.location.replace(`/${seq}/delete`); //서버에 이 번호삭제요청..
    }
  });

  btn_update.addEventListener("click", (e) => {
    const seq = e.target.dataset.seq;
    if (seq) {
      document.location.replace(`/${seq}/update`);
    } else {
      alert("일련번호가 잘못되었습니다");
    }
  });
});
