//d 뺐음. 이코드는 그냥안쓴다고.
document.addEventListener("DOMContentLoade", () => {
  const btn_list = document.querySelector("button.list");
  const btn_update = document.querySelector("button.update");
  const btn_delete = document.querySelector("button.delete");

  btn_list.addEventListener("click", () => {
    document.location.href = "/books";
  });
  btn_update.addEventListener("click", (e) => {
    document.location.replace(`/books/${e.target.dataset.isbn}/update`);
  }); // 타겟변수선언없이 바로 isbn 뽑아내기
  btn_delete.addEventListener("click", (e) => {
    if (confirm("도서정보를 정말 삭제할까요??")) {
      document.location.replace(`/books/${e.target.dataset.isbn}/delete`);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.detail.btn"); //버튼박스자체를 선택
  btn_box.addEventListener("click", (e) => {
    const button = e.target;
    // 버튼누르면~
    if (button.tagName === "BUTTON") {
      const className = button.className; // 누른버튼의 이름
      const isbn = button.dataset.isbn; // 지금보고있는 디테일의 isbn 가져오고

      let url = "/books";
      if (className === "update") {
        url += `/${isbn}/update`;
      } else if (className === "delete") {
        // 딜리트버튼누르면
        if (!confirm("도서정보를 정말 삭제할까요??")) {
          // 삭제취소하면
          return false; // 더 진행하지마
        }
        url += `/${isbn}/delete`;
      }
      document.location.replace(url);
    }
  });
});
