$(function () {
  // Scroll Coord
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
  // function addStar() {
  //   const star = document.createElement("span");
  //   star.className = "star";
  //   star.style.setProperty("--size", Math.random() * 10 + 3 + "vmin");
  //   star.style.left = Math.floor(Math.random() * 100) + "%";
  //   star.style.top = Math.floor(Math.random() * 100) + "%";
    
  //   document.querySelector(".about .contents").appendChild(star);
  // }
  // setInterval(addStar, 40);
  
  // temp.forEach((item, i) => {
  //   item.addEventListener("click", () => {
  //     item.src = `images/project-thumb${i + 1}.png`;
  //   });
  // });

  // Image Animation
  const scriptItems = document.querySelectorAll(".script-list li");
  scriptItems.forEach((el) => {
    gsap.set(".script-img", { xPercent: -50, yPercent: -50 });
    const img = el.querySelector(".script-img");
    const innerImg = el.querySelector(".script-img img");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = {
      x: pos.x
    };
    const speed = 0.1;
    const xSet = gsap.quickSetter(img, "x", "px");
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      xSet(pos.x);
    });

    var direction = "",
      oldx = 0,
      lastCursorX = null,
      cursorThreshold = 150,
      mousemovemethod = function (e) {
        if (e.pageX < oldx && e.clientX <= lastCursorX - cursorThreshold) {
          direction = "left";
          lastCursorX = e.clientX;
          innerImg.style.transform = "rotate(-15deg)";
        } else if (
          e.pageX > oldx &&
          e.clientX >= lastCursorX + cursorThreshold
        ) {
          direction = "right";
          lastCursorX = e.clientX;
          innerImg.style.transform = "rotate(15deg)";
        }
        oldx = e.pageX;
      };
    $(document).on("mousemoveend", function () {
      innerImg.style.transform = "translateX(0%) rotate(0deg)";
    });
    document.addEventListener("mousemove", mousemovemethod);
    (function ($) {
      var timeout;
      $(document).on("mousemove", function (e) {
        if (timeout !== undefined) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
          // trigger the new event on event.target, so that it can bubble appropriately
          $(e.target).trigger("mousemoveend");
        }, 100);
      });
    })(jQuery);
  });

  // Hacky Code
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;
  const list = document.querySelectorAll(".script li");

  list.forEach((el) => {
    el.onmouseenter = (event) => {
      const targetEl = event.target.querySelector("h4");
      let iteration = 0;
      console.log(targetEl.dataset.value)
      const interval = setInterval(() => {
        targetEl.innerText = targetEl.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetEl.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= targetEl.dataset.value.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 20);
    };
  });

  // Modal
  $(".play-btn").click(function () {
    $(this).siblings("#modal-inner").addClass("active");
    $("body").addClass("modal-active");
  });

  $(".close-btn").click(function () {
    $(this).closest("#modal-inner").removeClass("active");
    $("body").removeClass("modal-active");
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