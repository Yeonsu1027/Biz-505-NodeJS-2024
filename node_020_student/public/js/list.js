document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");
  table.addEventListener("click", (event) => {
    const target = event.target;
    // 전체적으로 TD가 클릭되면 가장 가까운 TR을 찾으란 뜻이된다.
    if (target.tagName === "TD") {
      //   alert(target.innerText);
      const parentsTR = target.closest("TR"); // 타겟기준 가장가까운 TR
      const tds = parentsTR.querySelectorAll("TD"); // 그리고 그TR이 가진 TD를 전부. 배열0번은 학번이다.
      const st_num = tds[0].innerText; // 학번이 primary니까 그학번정보의 어디를골라도 학번이 나오게. 이걸서버로보내서 조회해야함
      // href = "/student/" + st_num + "/detal"    이것과 아래는 같다                //문자열을 만들때 +없이$로
      document.location.href = `/student/${st_num}/detail`; //  정보누르면 /student(누른사람학번)/detail 주소가된다
    }
  });
});
