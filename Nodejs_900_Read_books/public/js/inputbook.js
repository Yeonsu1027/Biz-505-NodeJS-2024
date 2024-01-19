document.addEventListener("DOMContentLoaded", () => {
  //할인가 = 가격*90%

  let price = document.querySelector("input.price");
  let sale = document.querySelector("input.sale");

  sale = (price * 90) / 100;
});
