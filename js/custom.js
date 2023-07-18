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
    
    document.querySelector(".about .contents").appendChild(star);
  }
  // setInterval(addStar, 40);

  const temp = document.querySelectorAll(".pj-img img");

  temp.forEach((item, i) => {
    item.addEventListener("click", () => {
      item.src = `images/project-thumb${i + 1}.png`;
    });
  });

});

// Add Paint Element
function addPaint() {
  const contents = document.querySelectorAll(".about .cont1, .about .cont2, .about .cont3");
  const titPages = document.querySelectorAll(".paint-bg");

  for (let i = 0; i < contents.length; i++) {
    for (let s = 0; s < 8; s++) {
      const paint = document.createElement("span");
      paint.className = "paint";
      document.querySelector(`.${contents[i].className}`).appendChild(paint);
    }
  }

  for (let i = 0; i < titPages.length; i++) {
    for (let s = 0; s < 17; s++) {
      const paint = document.createElement("span");
      paint.className = "paint";
      paint.style.setProperty("--size", Math.random() * 50 + "vmin");
      document.querySelector(`#${titPages[i].offsetParent.id} .${titPages[i].className}`).appendChild(paint);
    }
  }
  
}
addPaint();