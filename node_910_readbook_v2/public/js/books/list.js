// document.addEventListener("DOMContentLoaded", () => {
//   const table = document.querySelector("table.books");
//   table?.addEventListener("click", (event) => {
//     const target = event.target;

//     if (target.tagName === "TD") {
//       const paTR = target.closest("TR");
//       const tds = paTR.querySelectorAll("TD");
//       const isbn = tds[0].innerText;
//       document.location.href = `/books/${isbn}/detail`;
//     }
//   });
// });  --직접넣은거

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("table.books tbody"); //table.books 아래 tbody
  tbody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      // click 된 TD 의 부모 TR 을 selector 하라
      const parTr = target.closest("TR");
      const isbn = parTr.dataset.isbn; //list pug에서 isbn가져오기
      // data-'변수' 이걸 가져오는게 dataset.변수 인듯?
      // alert(isbn);

      // document.location.href = `/books/${isbn}/detail`;
      document.location.replace(`/books/${isbn}/detail`); // 뒤로가기xx
    }
  });
});
