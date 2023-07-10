$(function () {
  // Scroll coord
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;

    document.querySelector(".scroll").innerText = Math.round(scrollTop);
  });

  // Skrollr
  let s = skrollr.init({
    forceHeight: false,
    smoothScrolling: true,
    smoothScrollingDuration: 200
  });

  // Menu
  $(".menu-btn").on("click",function(){
    $(this).toggleClass("active");
  });

  // About star
  function addStar() {
    const star = document.createElement("span");
    star.className = "star";
    star.style.setProperty("--size", Math.random() * 10 + 3 + "vmin");
    star.style.left = Math.floor(Math.random() * 100) + "%";
    star.style.top = Math.floor(Math.random() * 100) + "%";
    
    document.querySelector(".main .contents").appendChild(star);
  }

  // setInterval(addStar, 40);
  
});