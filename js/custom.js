$(function () {
  // 스크롤 좌표
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;

    document.querySelector(".scroll").innerText = Math.round(scrollTop);
  });

  // 스크롤러
  let s = skrollr.init({
    forceHeight: false,
    smoothScrolling: true,
    smoothScrollingDuration: 400,
  });

    $(".menu-btn").on("click",function(){
      $(this).toggleClass("active");
    });

});