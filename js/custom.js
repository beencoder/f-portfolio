// 스크롤 좌표
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;

  document.querySelector(".scroll").innerText = Math.round(scrollTop);
});

// 스크롤러
let s = skrollr.init({
  smoothScrolling: true,
  smoothScrollingDuration: 700,
});