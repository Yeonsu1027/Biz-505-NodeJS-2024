document.addEventListener("DOMContentLoaded", () => {
  const update_std = document.querySelector("button.update_std");

  update_std.addEventListener("click", (e) => {
    const target = e.target;

    const stdnum = target.closest("UL").dataset.stdnum;

    document.location.href = `/update/${stdnum}`;
  });
  //   ---------------------------------

  const add_score = document.querySelector("button.insert_score");

  add_score.addEventListener("click", (e) => {
    const target = e.target;

    const stdnum = target.closest("DIV").dataset.stdnum;
    document.location.href = `/add/score/${stdnum}`;
  });
  //   ------------------------------

  //   const update = document.querySelector("button.update_score");

  //   update.addEventListener("click", (e) => {
  //     const target = e.target;

  //     const stdnum = target.closest("DIV").dataset.stdnum;
  //     document.location.href = `/update/score/${stdnum}`;
  //   });
  //  성적정보 삭제--------------
  const delete_btn = document.querySelector("button.delete_score");
  delete_btn.addEventListener("click", (e) => {
    const target = e.target;
    if (confirm("성적정보를 일괄 삭제하시겠습니까?")) {
      const stdnum = target.closest("DIV").dataset.stdnum;
      document.location.href = `/delete/score/${stdnum}`;
    }
    return false;
  });

  // --------- 성적정보 과목별 삭제
  const box = document.querySelector("div.subscore");
  box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const stdnum = target.closest("UL").dataset.stdnum;
      const subject = target.closest("LI").dataset.subject;

      document.location.href = `/delete/score/${stdnum}/${subject}`;
    }
  });
});
