document.addEventListener("DOMContentLoaded", function () {
  // nav
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

  // cateHead mouseout 이벤트???
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
    console.log("hover");
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
      }, 2000);
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

  //상품 슬라이드
  document
    .querySelectorAll(".slider_wrapper")
    .forEach(function (sliderWrapper) {
      var sliderUl = sliderWrapper.querySelector("ul"),
        slides = sliderUl.querySelectorAll("li"),
        currentIdx = 0,
        slideCount = slides.length,
        prevBtn = sliderWrapper.querySelector(".prev_btn"),
        nextBtn = sliderWrapper.querySelector(".next_btn");

      // 슬라이드 너비 설정
      function setSlideWidth() {
        var slideWidth = slides[0].offsetWidth; // 슬라이드의 현재 너비
        var slideMargin = parseInt(
          window.getComputedStyle(slides[0]).marginRight
        ); // 슬라이드의 현재 마진
        sliderUl.style.width =
          slideWidth * slideCount + slideMargin * (slideCount - 1) + "px";
        return { slideWidth, slideMargin };
      }

      // 슬라이드 이동 너비 설정
      function moveSlide(idx) {
        sliderUl.style.left = -idx * (slideWidth + slideMargin) + "px";
        currentIdx = idx;
      }

      // 초기 슬라이드 설정
      var { slideWidth, slideMargin } = setSlideWidth();

      nextBtn.addEventListener("click", function () {
        if (
          currentIdx ===
          slideCount -
            Math.floor(sliderWrapper.offsetWidth / (slideWidth + slideMargin))
        ) {
          moveSlide(0, slideWidth, slideMargin); // 첫 슬라이드로 이동
        } else {
          moveSlide(currentIdx + 1, slideWidth, slideMargin); // 다음 슬라이드로 이동
        }
      });

      prevBtn.addEventListener("click", function () {
        if (currentIdx === 0) {
          moveSlide(
            slideCount -
              Math.floor(
                sliderWrapper.offsetWidth / (slideWidth + slideMargin)
              ),
            slideWidth,
            slideMargin
          ); // 마지막 슬라이드로 이동
        } else {
          moveSlide(currentIdx - 1, slideWidth, slideMargin); // 이전 슬라이드로 이동
        }
      });

      // 윈도우 리사이즈 이벤트 처리
      window.addEventListener("resize", function () {
        var { slideWidth, slideMargin } = setSlideWidth(); // 슬라이드 크기 재설정
        moveSlide(currentIdx, slideWidth, slideMargin); // 현재 위치를 유지하면서 슬라이드 이동
      });
    });

  //rate random
  function put_random() {
    $(".rating").each(function () {
      let randomRate = (Math.random() * 2 + 3).toFixed(1);
      if (randomRate > 5) {
        randomRate = 5;
      }
      $(this).attr("data-rate", randomRate);
    });
    $(".review_num").each(function () {
      let randomNum = Math.ceil(Math.random() * 900) + 1000;
      $(this).html(`(${randomNum})`);
    });
    // console.log(randomNum);
  }
  put_random();

  //review random
  function put_reviewNum() {
    $(".review_num").each(function () {
      let randomRate = (Math.random() * 2 + 3).toFixed(1);
      if (randomRate > 5) {
        randomRate = 5;
      }
      $(this).attr("data-rate", randomRate);
    });
  }
  put_reviewNum();

  //star rating
  const ratings = document.querySelectorAll(".rating");
  ratings.forEach(function (rating) {
    let starWraps = rating.querySelectorAll(".star-wrap"),
      scoreNum = rating.getAttribute("data-rate"),
      scoreArr = scoreNum.split("."); //ex)4.5 -> [ "4", "5" ]

    if (scoreArr.length > 1) {
      for (let i = 0; i < parseInt(scoreArr[0], 10); i++) {
        starWraps[i].querySelector(".star").style.width = "100%";
        //for 루프 내에서 i를 인덱스로 사용하여 starWraps 집합의 각 요소에 접근하고, 각 .star-wrap 요소 내에 있는 .star 요소의 스타일을 변경할 수 있습니다
        // [i]는 배열(또는 유사 배열 객체)에서 특정 인덱스에 있는 요소에 접근하기 위해 사용됩니다.
      }
      starWraps[parseInt(scoreArr[0], 10)].querySelector(".star").style.width =
        scoreArr[1] + "0%";
    } else {
      for (let i = 0; i < scoreNum; i++) {
        starWraps[i].querySelector(".star").style.width = "100%";
      }
    }
  });
  // let rating = $(".rating");
  // rating.each(function () {
  //   let $this = $(this);
  //   let scoreNum = $this.attr("data-rate");
  //   let scoreArr = scoreNum.split(".");
  //   console.log(scoreArr);
  //   if (scoreArr.length > 1) {
  //     for (let i = 0; i < scoreArr[0]; i++) {
  //       $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
  //     }
  //     $this
  //       .find(".star-wrap")
  //       .eq(scoreArr[0])
  //       .find(".star")
  //       .css({ width: scoreArr[1] + "0%" });
  //   } else {
  //     for (let i = 0; i < scoreNum; i++) {
  //       $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
  //     }
  //   }
  // });
});
