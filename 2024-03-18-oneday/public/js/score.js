document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button.save");
  btn.addEventListener("click", (event) => {
    const score = document.querySelector("input.score");
    const scoreValue = Number(score.value);

    if (score.value === "" || scoreValue > 100 || scoreValue < 0) {
      alert("정확한 점수를 입력해주세요\n0 ~ 100 점을 입력해주세요");
      event.preventDefault();
      return false;
    }
  });
});
