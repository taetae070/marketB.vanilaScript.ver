document.addEventListener("DOMContentLoaded", function () {
  //x 버튼 
  const modalPop = document.querySelector("modal");
  const closeBtn = modalPop.querySelector(".close");

  closeBtn.addEventListener("click", function () {
    modalPop.classList.toggle("modalHidden");
  });

  //메인 슬라이드 button (쇼핑하기) 
  const mainEventUrl = "https://brand.naver.com/marketb/category/2242980862094ed0b89ce6d953f6f180?cp=2";
  const shopBtn = document.querySelector(".red_Btn_big");

  shopBtn.addEventListener("click", function() {
    location.href = mainEventUrl;
  });

  //상품 슬라이드 button (세일) 
  const saleButton = document.querySelector(".saleButton");
    const saleUrl = "https://brand.naver.com/marketb/category/2242980862094ed0b89ce6d953f6f180?cp=2";

    saleButton.addEventListener("click", function() {
      location.href =saleUrl;
    });


  //슬라이드 좌우 버튼 
  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlide: true,
    // centeredSlideLi: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: "true",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //정지, 플레이 버튼
  const pauseBtn = document.querySelector(".slide_start .pause");
  const playBtn = document.querySelector(".slide_start .play");
  pauseBtn.addEventListener("click", () => {
    swiper.autoplay.stop();
    pauseBtn.classList.toggle("hidden");
    playBtn.classList.toggle("visible");
  });
  playBtn.addEventListener("click", () => {
    swiper.autoplay.start();
    playBtn.classList.remove("visible");
    pauseBtn.classList.remove("hidden");
  });

  //검색창 버튼 
  const gnb = document.querySelector(".gnb_search"),
    SearchInput = document.querySelector(".gnb_search input"),
    SearchBtn = document.querySelector(".icon_search > button");
  SearchBtn.addEventListener("click", function () {
    gnb.classList.toggle("on");
    SearchInput.classList.toggle("on");
  });

  //section01 슬라이드 
  //상품 슬라이드
  const sliderWrapper = document.querySelector(".slider_wrapper");
  var sliderUl = sliderWrapper.querySelector("ul"),
    slides = sliderUl.querySelectorAll("li"),
    currentIdx = 0,
    slideCount = slides.length,
    slideMargin = parseInt(window.getComputedStyle(sliderUl).gap, 10),
    slideWidth = slides[0].offsetWidth,
    prevBtn = sliderWrapper.querySelector(".prev_btn"),
    nextBtn = sliderWrapper.querySelector(".next_btn");

  // 슬라이드 너비 설정
  function setSlideWidth() {
    // var slideWidth = slides[0].offsetWidth;
    // var slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
    sliderUl.style.width =
      slideWidth * slideCount + slideMargin * (slideCount - 1) + "px";
    return { slideWidth, slideMargin };
  }

  // 슬라이드 이동 너비 설정
  function moveSlide(idx) {
    sliderUl.style.left = -idx * (slideWidth + slideMargin) + "px";
    currentIdx = idx;
  }

  // 초기값
  var { slideWidth, slideMargin } = setSlideWidth();

  nextBtn.addEventListener("click", function () {
    if (
      currentIdx ===
      slideCount -
        Math.floor(sliderWrapper.offsetWidth / (slideWidth + slideMargin)) // 전체너비/슬라이드1개 = 화면에 나타낼 수 있는 슬라이드 갯수
    ) {
      moveSlide(0);
    } else {
      moveSlide(currentIdx + 1);
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIdx === 0) {
      moveSlide(
        slideCount -
          Math.floor(sliderWrapper.offsetWidth / (slideWidth + slideMargin))
      ); // 마지막 슬라이드로 이동
    } else {
      moveSlide(currentIdx - 1); // 이전 슬라이드로 이동
    }
    console.log("clicked");
  });

  // 윈도우 리사이즈 이벤트 처리
  window.addEventListener("resize", function () {
    var { slideWidth, slideMargin } = setSlideWidth(); // 슬라이드 크기 재설정
    moveSlide(currentIdx, slideWidth, slideMargin); // 현재 위치를 유지하면서 슬라이드 이동
  });


  //magazine 
  const circles = document.querySelectorAll(".circle");

  circles.forEach((c) => {
    const circleInfo = c.closest("li").querySelector(".magaInner");

    const showCircleInfo = () => {
      if (circleInfo) {
        circleInfo.style.opacity = "1";
        circleInfo.style.pointerEvents = "auto"; // 마우스 이벤트 활성화
      }
    };

    const hideCircleInfo = () => {
      setTimeout(() => {
        if (
          circleInfo &&
          !circleInfo.matches(":hover") &&
          !c.matches(":hover")
        ) {
          circleInfo.style.opacity = "0";
          circleInfo.style.pointerEvents = "none"; // 마우스 이벤트 비활성화
        }
      }, 300);
    };

    c.addEventListener("mouseover", showCircleInfo);
    c.addEventListener("mouseout", hideCircleInfo);

    if (circleInfo) {
      circleInfo.addEventListener("mouseout", hideCircleInfo);
    }
  });

  //coupon -> 문제점: 페이지로드하자마자 쿠폰섹션으로 가면 이미지 로드가 늦어서 작동이 안됌
  const section5 = document.querySelector(".random_coupon"),
    couponCon = section5.querySelector(".notice"), //coupon Container
    couponGrey = document.querySelector(".cp_before"), //긁기 전 회색박스
    couponGreyWidth = couponGrey.offsetWidth,
    couponGreyHeight = couponGrey.offsetHeight,
    couponOff = couponCon.getBoundingClientRect();

  function event_Sketch() {
    const couponDiv = `<div class="scratch"></div>`.repeat(32);
    document.querySelector(".grid").innerHTML = couponDiv;
    const scratchs = document.querySelectorAll(".scratch");
    if (scratchs.length > 0) {
      const randomImg = Math.floor(Math.random() * 3) + 1;

      function imgChange() {
        scratchs.forEach((scratch, i) => {
          scratch.style.backgroundImage = `url("img/main/coupon${randomImg}.png")`;

          const scratchOff = scratch.getBoundingClientRect();
          scratch.style.backgroundSize = `${couponGreyWidth}px ${couponGreyHeight}px`;
          scratch.style.backgroundPositionX = `-${
            scratchOff.left - couponOff.left + window.scrollX
          }px`;
          scratch.style.backgroundPositionY = `-${
            scratchOff.top - couponOff.top + window.scrollY
          }px`;

          // console.log("Mouseover event triggered");
          scratch.addEventListener("mouseover", function () {
            this.classList.add("drawing");
            checkOpacity();
          });
        });
      }
    }
    imgChange();
    // console.log("imgChange function called");
  }

  event_Sketch();

  // a태그 넣어주기
  function checkOpacity() {
    let drawingbox = document.querySelectorAll(".grid .drawing");
    let allscratch = document.querySelectorAll(".scratch");
    let grid = document.querySelector(".notice .grid");
    let aTag = document.createElement("a");
    aTag.href =
      "https://marketb.kr/board/gallery/read2.html?no=1526286&board_no=2";

    if (drawingbox.length === allscratch.length) {
      if (!grid.classList.contains("done")) {
        grid.classList.add("done");
        grid.appendChild(aTag);
      }
    }
  }

  //reponsive :aside, promo
  const screenWidth = window.innerWidth,
    aside_spans = document.querySelectorAll("aside span"),
    promo_ps = document.querySelectorAll(".sec3_p03");

  if (screenWidth <= 500) {
    aside_spans.forEach((span) => {
      span.classList.add("icon-text", "A");
    });

    promo_ps.forEach((p) => {
      p.style.display = "none";
    });
  }
});
