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
      // "방법1" isbn가져오기
      // button 에 부착된 data-isbn 으로부터 isbn 값을 가져오기
      // const isbn = button.dataset.isbn; // 지금보고있는 디테일의 isbn 가져오고
      // "방법2"  -- 이런것들은 오타가 나기쉬우므로 data-isbn을 한 번만쓰는 방법
      // button 들을 감싸고 있는 DIV tag 에 부착된 data-isbn 으로 부터
      //  isbn 값을 가져오기
      const parDIV = button.closest("DIV"); // 방금클릭된 버튼의 부모
      const isbn = parDIV.dataset.isbn; // 이렇게 가져오는 방법도 있다

      let url = "/books";
      if (className === "update") {
        // url = url + `/${isbn}/update`
        url += `/${isbn}/update`; // /books/0001/update 의 형태가된다.
      } else if (className === "delete") {
        // 딜리트버튼누르면
        if (!confirm("도서정보를 정말 삭제할까요??")) {
          // 삭제취소하면
          return false; // 더 진행하지마
        }
        url += `/${isbn}/delete`;
      }
      document.location.replace(url); // 다통과하고 오면 /books로 이동
    }
  });
});
