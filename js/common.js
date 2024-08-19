document.addEventListener("DOMContentLoaded", function () {
    //x 버튼 
    const modalPop = document.querySelector("modal");
    const closeBtn = modalPop.querySelector(".close");
  
    closeBtn.addEventListener("click", function () {
      modalPop.classList.toggle("modalHidden");
    });

    
  //메뉴버튼
  const menuBtn = document.querySelector(".mainNAV .menu_btn");
  const cateHead = document.querySelector(".category_list");
  const cateHeadAll = document.querySelectorAll(".category_list");
  const cateList01 = document.querySelectorAll(
    ".category_list .catebox_1 > li"
  );
  // const cateList02 = document.querySelectorAll(".category_list .catebox_2 li");

  function menuClicked() {
    menuBtn.addEventListener("click", () => {
      cateHead.classList.toggle("visible");
    });
  }
  menuClicked();

  // categoryHead mouseout
  cateHeadAll.forEach(function (head) {
    head.addEventListener("mouseover", function () {
      const parentLi = head.parentElement;
      parentLi.classList.add("visible");
    });

    head.addEventListener("mouseout", function () {
      const parentLi = head.parentElement;
      parentLi.classList.remove("visible");
    });
  });

  function hoverEvent() {
    cateList01.forEach(function (list01) {
      list01.addEventListener("mouseover", function () {
        list01.classList.add("visible");

        const cateList02 = list01.querySelectorAll(".catebox_2 li");
        cateList02.forEach(function (list02) {
          list02.addEventListener("mouseover", function () {
            list02.classList.add("visible");
          });
        });
      });
    });
  }
  hoverEvent();



  // wish, cart btn
  const wishBtns = document.querySelectorAll(".wish_Btn");
  const cartBtns = document.querySelectorAll(".cart_Btn");
  const wishAlert01 = document.querySelector(".wish_alert01");
  const wishAlert02 = document.querySelector(".wish_alert02");
  const cartAlert01 = document.querySelector(".cart_alert01");
  const cartAlert02 = document.querySelector(".cart_alert02");

  function handleAlert(button, alertOn, alertOff) {
    button.addEventListener("click", function () {
      if (button.classList.contains("on")) {
        alertOn.classList.add("active");
        alertOff.classList.remove("active");
      } else {
        alertOn.classList.remove("active");
        alertOff.classList.add("active");
      }
      setTimeout(function () {
        alertOn.classList.remove("active");
        alertOff.classList.remove("active");
      }, 7000);
    });
  }
  wishBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("on");
    });
  });

  cartBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("on");
    });
    wishBtns.forEach(function (btn) {
      handleAlert(btn, wishAlert01, wishAlert02);
    });

    cartBtns.forEach(function (btn) {
      handleAlert(btn, cartAlert01, cartAlert02);
    });
  });

  // btn top
  let allHeight = document.documentElement.scrollHeight;
  let scrOffset = window.scrollY; //사용자가 페이지에서 스크롤한 양
  const btnTop = document.getElementById("btn_top");
  const footer = document.querySelector("footer");
  let footerOffset = footer.offsetTop;
  let footerHeight = footer.offsetHeight;
  let scrPercent = calculateScrPercent();
  const percentage = document.querySelector("#btn_top .percentage");

  function calculateScrPercent() {
    let windowHeight = window.innerHeight; //사용자가 보고 있는 브라우저 창의 높이
    let scrAbleHeight = allHeight - footerHeight; //스크롤 가능한 높이

    if (scrAbleHeight <= 0) {
      return 100;
    }
    return ((scrOffset + windowHeight) / scrAbleHeight) * 100;
    //현재 창의 하단 위치가 스크롤 가능한 높이에 대해 얼마나 비율을 차지하는지
  }

  function btnTopPosition() {
    if (scrOffset > 100) {
      btnTop.classList.add("on");
    } else {
      btnTop.classList.remove("on");
    }
    percentage.style.height = `${scrPercent * 1.2}%`;
  }

  window.addEventListener("scroll", function () {
    scrOffset = window.scrollY;
    scrPercent = calculateScrPercent();
    btnTopPosition();
  });

  //맨 위로 이동
  btnTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(function () {
      scrOffset = window.scrollY;
      scrPercent = calculateScrPercent();
      btnTopPosition();
    }, 300);
    //스크롤이 완료되기 전에 스크롤 위치와 관련된 값을 업데이트하면 잘못된 값을 가져올 수 있음
  });

  function commonResizeEvent() {
    let allHeight = document.documentElement.scrollHeight;
    let scrOffset = window.scrollY;
    let footerOffset = footer.offsetTop;
    let footerHeight = footer.offsetHeight;
    scrPercent = calculateScrPercent();
  }

  window.addEventListener("resize", function () {
    setTimeout(function () {
      commonResizeEvent();
      scrPercent = calculateScrPercent();
      btnTopPosition();
    }, 500);
  });

  const slide_start = document.querySelectorAll(".slider_wrapper");
  const imgWidth = document.querySelector(".bestList .bestItem img").width;
  const rowgap_value = parseInt(
    window.getComputedStyle(slide_start[0].querySelector("ul")).rowGap
  );

  slide_start.forEach(function (slider) {
    const slide_UL = slider.querySelector("ul");
    const slides = slide_UL.querySelectorAll("li");
    let currentIdx = 0;
    const slideCount = slides.length;
    const slideWidth = imgWidth;
    const slideToShow = 3;
    const prevBtn = slider.querySelector(".prev_btn");
    const nextBtn = slider.querySelector(".next_btn");

    // ul 너비지정
    slide_UL.style.width =
      slideWidth * slideCount + rowgap_value * (slideCount - 1) + "px";

    // 슬라이드 이동함수
    function moveSlide(idx) {
      slide_UL.style.left = -idx * (slideWidth + rowgap_value) + "px";
      currentIdx = idx;
    }
    moveSlide(currentIdx);

    // 버튼으로 이동하기
    nextBtn.addEventListener("click", function () {
      if (currentIdx === slideCount - slideToShow) {
        moveSlide(0);
      } else {
        moveSlide(currentIdx + 1);
      }
    });

    prevBtn.addEventListener("click", function () {
      if (currentIdx === 0) {
        moveSlide(slideCount - slideToShow);
      } else {
        moveSlide(currentIdx - 1);
      }
    });
  });

  //평점, 리뷰수 무작위
  function putRandomAndReviewNum() {
    document.querySelectorAll(".rating").forEach(function (el) {
      let randomRate = (Math.random() * 2 + 3).toFixed(1);
      if (randomRate > 5) {
        randomRate = 5;
      }
      el.setAttribute("data-rate", randomRate);
    });

    document.querySelectorAll(".review_num").forEach(function (el) {
      let randomNum = Math.ceil(Math.random() * 900) + 1000;
      el.innerHTML = `(${randomNum})`;

      let randomRate = (Math.random() * 2 + 3).toFixed(1);
      if (randomRate > 5) {
        randomRate = 5;
      }
      el.setAttribute("data-rate", randomRate);
    });
  }

  putRandomAndReviewNum();

  //random star rating
  const ratings = document.querySelectorAll(".rating");
  ratings.forEach(function (rating) {
    let starWraps = rating.querySelectorAll(".star-wrap"),
      scoreNum = rating.getAttribute("data-rate"),
      scoreArr = scoreNum.split("."); //ex) 4.5 -> ["4", "5"]

    if (scoreArr.length > 1) {
      let fullStars = parseInt(scoreArr[0], 10);
      for (let i = 0; i < fullStars; i++) {
        starWraps[i].querySelector(".star").style.width = "100%";
      }
      if (fullStars < starWraps.length) {
        starWraps[fullStars].querySelector(".star").style.width =
          scoreArr[1] * 10 + "%";
      }
    } else {
      for (let i = 0; i < scoreNum; i++) {
        starWraps[i].querySelector(".star").style.width = "100%";
      }
    }
  });
});
