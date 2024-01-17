document.addEventListener("DOMContentLoaded", () => {
  const ST_INDEX = {
    ST_NUM: 0,
    ST_NAME: 1,
    ST_DEPT: 2,
  };

  // 가져오는 여러방법들

  //   const st_num = document.querySelector("input[name='st_num']")  : 이렇게 쓸 수도있지만
  //---------------------------------------------------- 1 뭐지 이거만되는데
  const st_num = document.querySelector("#st_num"); // id를 붙이면 이렇게 간편하게 쓸 수 있다!!!
  const st_name = document.querySelector("#st_name");
  const st_dept = document.querySelector("#st_dept");
  const btn_submit = document.querySelector("form.student button");
  const form = document.querySelector("form.student"); //부모태그를 선택하고.. 하나씩가져온다
  //----------------------------------------------------- 2
  //   const st_num = form.querySelector("#st_num");
  //   const st_name = form.querySelector("#st_name");
  //   const st_dept = form.querySelector("#st_dept");
  //---------------------------------------------------- 3
  //   const st_submit = form.querySelector("button");
  //   const inputs = form.querySelectorAll("input");
  //   const st_num = inputs[ST_INDEX.ST_NUM]; //배열로부터 셀럭트를 하나씩 가져오는 방법
  //   const st_name = inputs[ST_INDEX.ST_NAME];
  //   const st_dept = inputs[ST_INDEX.ST_DEPT];

  // 여러개의 tag 묶음을 배열로 만들기
  const error_divs = document.querySelectorAll("div.student.error");

  /*
   * 먼저 btn_submit(button) 의 click event 를 최소한으로 테스트를 하고
   * 이후에 btn_submit null pointer exception 을 일으키는 현상을 방지하기 위하여
   * btn_submit? 형식으로 이후 코드를 사용한다
   */
  btn_submit?.addEventListener("click", () => {
    // ?:nullpointer exception
    // alert("전송");

    // 표시되었던 error 메시지를 모두 clear
    error_divs.forEach((item) => (item.innerHTML = "")); // forEach문을 사용하여 입력이되면, 입력하세요~ 문구지우기.

    // 값이 비어있으면
    if (!st_num.value) {
      //학번이 없으면 아래에 있던 비어있는 div에 학번을 입력하라는 문구가 나온다.
      // alret 창은 오류가 나서 이런식으로 많이쓴다.
      error_divs[ST_INDEX.ST_NUM].innerHTML = "* 학번은 반드시 입력하세요"; // input 박스에있는 첫번째 div box
      st_num.select();
      return false;
    }
    if (!st_name.value) {
      error_divs[ST_INDEX.ST_NAME].innerHTML = "* 학생의 이름은 반드시 입력해야 합니다";
      st_name.select();
      return false;
    }
    if (!st_dept.value) {
      error_divs[ST_INDEX.ST_DEPT].innerHTML = "* 학과는 반드시 입력하세요";
      st_dept.select();
      return false; // 유효성검사 실패시 다시입력
    }

    // 유효성 검사를 마치면 서버로 데이터 보내기
    form.submit();
  });
});
