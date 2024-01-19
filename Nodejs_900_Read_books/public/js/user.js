document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.querySelector('input[name="M_PASSWORD"]');
  const passwordConfirmInput = document.querySelector('input[name="M_PR"]');
  const passreDiv = document.querySelector(".passre");

  const check = () => {
    if (passwordInput.value !== passwordConfirmInput.value) {
      passreDiv.textContent = "비밀번호가 일치하지 않습니다";
      passwordConfirmInput.focus();
      const target = document.getElementById("bbbbb"); //안같으면 버튼꺼버리기
      target.disabled = true; // 안보이게=true : 안보임
    } else {
      passreDiv.textContent = "";
      const target = document.getElementById("bbbbb");
      target.disabled = false;
    }
  };

  passwordConfirmInput.addEventListener("input", check); //입력이되면 검사하기..
});
