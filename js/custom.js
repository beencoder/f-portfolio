// Loading
const animationOptions = {
  ease: "expo.inOut"
};

// 인트로 배경 이벤트
const introAnimation = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: animationOptions.ease,
      duration: 1
    }
  });

  tl.to(".loading .loading-tit", {
    duration: 1,
    y: 0,
    autoAlpha: 1,
  }).
  to(".loading .bg-l, .loading .bg-r", {
    scaleX: 1
  }).
  to(".loading .bg-l, .loading .bg-r", {
    scaleY: 0,
    transformOrigin: "top center"
  }).
  to(".loading .loading-tit", {
    duration: 1,
    y: -60,
    autoAlpha: 0
  },"-=0.6").
  to(".loading", {
    y: "-150%"
  },"-=0.5");

  return tl;
};

// 인트로 모션 이벤트
const skewInElements = e => {
  const tl = gsap.timeline();

  tl.from(e, {
    duration: 1.1,
    ease: animationOptions.ease,
    opacity: 0,
    autoAlpha: 0,
  });

  return tl;
};

// 인트로 이벤트 적용
const introMaster = gsap.timeline({
  paused: false,
  delay: 0.2
});

introMaster.add(introAnimation()).add(skewInElements("#section1"), "-=1");

// Skrollr 적용
let s = skrollr.init({
  // forceHeight: false,
  smoothScrolling: true,
  smoothScrollingDuration: 200
});

// 선택자
const menuBtn = document.querySelector(".menu-btn");
const menuLists = document.querySelectorAll(".menu li a");
const changeImgBtns = document.querySelectorAll(".change-btn");
const scriptItems = document.querySelectorAll(".script-list .item");
const modalOpenBtn = document.querySelectorAll(".play-btn");
const modalCloseBtn = document.querySelectorAll(".close-btn");
const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cs");

// 햄버거 메뉴 버튼 클릭 시
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
})

// 스크롤 이동 이벤트
const goToScroll = name => {
  let location = document.querySelector(`#${name}`).offsetTop;

  window.scrollTo({top: location});
}

// 메뉴 클릭 시 스크롤 이동
menuLists.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    switch (item.textContent) {
      case "About":
        window.scrollTo({top: 2000});
        break;
      case "Project":
        goToScroll("section4");
        break;
      case "Script":
        goToScroll("section8");
        break;
      case "Contact":
        window.scrollTo({top: 43400});
        break;
    }
    menuBtn.classList.remove("active");
  });
})

// 프로젝트 이미지 버튼 클릭 시 이미지 변경
changeImgBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.src = `images/project-thumb${index + 1}.png`;
    btn.style.display = "none";
  })
})

// 스크립트 영역 이미지 이벤트
scriptItems.forEach(item => {
  gsap.set(".script-img", { xPercent: -50, yPercent: -50 });

  const img = item.querySelector(".script-img");
  const innerImg = item.querySelector(".script-img img");
  const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  const mouse = {x: pos.x};
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
        $(e.target).trigger("mousemoveend");
      }, 100);
    });
  })(jQuery);
});

// 스크립트 영역 타이틀 이벤트
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

scriptItems.forEach((el) => {
  el.onmouseenter = (event) => {
    const targetEl = event.target.querySelector("h4");
    let iteration = 0;
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

// 모달 버튼 클릭 시
modalOpenBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.nextElementSibling.classList.add("active");
    document.body.classList.add("modal-active");
  })
})

// 모달 닫기 버튼 클릭 시
modalCloseBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentNode.parentNode.parentNode.classList.remove("active");
    document.body.classList.remove("modal-active");
  })
})

// 커서 커스텀
const mouse = {
  x: -100,
  y: -100
};
const pos = {
  x: 0,
  y: 0
};
const speed = 0.1;

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener("mousemove", updateCoordinates);

function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

window.addEventListener("load", function() {
  loop();
})

//Scroll Coord
// window.addEventListener("scroll", () => {
//   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
//   document.querySelector(".scroll").innerText = Math.round(scrollTop);
// });