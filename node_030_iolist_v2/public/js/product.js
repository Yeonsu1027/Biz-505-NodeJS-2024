document.addEventListener("DOMContentLoaded", () => {
  /*
  * table.products 선택자는 상품리스트 화면에서는 유효한 선택자 이다
  * 하지만 detail, insert 등의 화면에서는 해당 선택자는 없는 상태이다
  * detail, insert 화면 등에서는 pro_table 객체가 null 인 상태가 된다는 것이다
  * pro_table 객체가 null 인 상태일때 .add() 등의 method 를 실행하면
  * null pointer exception 이 발생하고 HTML JS 에서는 이후의 JS 코드가 모두
  * 무력화 된다(실행이 안된다)
  *
  * 그래서 pro_table 객체가 null 일때는 다른 동작을 건너 뛰도록 해주어야 한다
  * 이때 사용하는 기호가 "객체?" 이러한 코드를 null safe 코드 라고 한다.
  */
  const pro_table = document.querySelector("table.products");
  pro_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;

      document.location.replace(`/products/${p_code}/detail`);
    }
  });
});

//기능 분리가 아닌 코드분리
// 한화면에 domcotentloaded 여러개여도됨.
document.addEventListener("DOMContentLoaded", () => {
  const btn_insert = document.querySelector("#btn_insert");
  btn_insert?.addEventListener("click", () => {
    document.location.replace("/products/insert"); // 뒤로가기x
  });
});

// 함수를 만드는코드
const imagePreView = (event) => {
  const img_add = document.querySelector("img.img_add");
  // input(type=file) 은 여러개의 파일을 선택(담기)할 수 있다
  // 현재는 한개의 파일만 선택하므로
  // 0 번째 파일만 추출하여 사용한다
  const file = event.target.files[0]; // 선택한파일이 0번째

  const fileReader = new FileReader(); //파일 읽어주는얘
  // 파일을 읽었으면 할일 미리 지정하기(event handler)
  fileReader.onload = (e) => {
    // onload : 파일이 로드가되면
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };
  // storage 에서 파일을 읽어라 라는 지시
  // 지시를 받고 비동기적으로 파일을 읽기 시작
  // 파일이 모두 읽혀 지면 onload 이벤트를 발생시킨다
  fileReader.readAsDataURL(file); // 파일을 읽어서 url로 변경해줘
  // 이게 완료되면
  // 위의 onload 가 비동기적으로 실행된다
};

//이미지 클릭하면 보이진않지만 이미지박스를 클릭한걸로
document.addEventListener("DOMContentLoaded", () => {
  const img_add = document.querySelector("img.img_add");
  const input_img = document.querySelector("#p_image");
  const div_img = document.querySelector("div.img_box");
  const input_focus = document.querySelector("#img_focus");

  img_add?.addEventListener("click", () => {
    input_img.click();
  });

  input_img?.addEventListener("change", imagePreView);

  // div박스 클릭하면 감춘 input애 포커스
  div_img.addEventListener("click", () => {
    input_focus.focus();
  });

  // 복붙하면 paste 이벤트발생 , e는 클립보드가된다
  div_img.addEventListener("paste", async (e) => {
    const items = e.clipboardData.items;
    const item = items[0]; //클립보드에저장된 첫번째가
    const img_add = document.querySelector("img.img_add"); 
    const input_image = document.querySelector("#p_image");

    if (item.type.indexOf("image") === 0) { //이미지니? 0이면 img
      const blob = item.getAsFile(); // 그복붙한이미지를 파일로..
      if (!blob) return false;

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const fileURL = event.target.result;
        img_add.src = fileURL;
      };
      fileReader.readAsDataURL(blob);

      // 복사 붙이기한 파일을 input(type=file) tag 에 포함하기
      const dataTransfer = new DataTransfer(); //데이터변환하기
      dataTransfer.items.add(blob); //blob 한거를 (items 위의변수가 아님!!!)
      input_image.files = dataTransfer.files; // input tag에 붙여넣는다(업로드)
    }
  });
});
