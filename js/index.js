document.addEventListener("DOMContentLoaded", function () {
  // window.addEventListener('resize', function() {
  //   location.reload();
  // });

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

  function handleSearchClick() {
    gnb.classList.toggle("on");
    SearchInput.classList.toggle("on");
  }
  function updateEventListener() {
    let screenWidth = window.innerWidth;
    if (screenWidth > 470) {
      SearchBtn.addEventListener("click", handleSearchClick);
    } else {
      SearchBtn.removeEventListener("click", handleSearchClick);
    }
  }
  updateEventListener();
  
  // btn top
  const btnTop = document.getElementById("btn_top");
    if (btnTop) {
      let allHeight = document.documentElement.scrollHeight;
      const footer = document.querySelector("footer");
      let footerHeight = footer.offsetHeight;
      let scrPercent = calculateScrPercent();
      const percentage = document.querySelector("#btn_top .percentage");
    
      function calculateScrPercent() {
        let windowHeight = window.innerHeight;
        let scrAbleHeight = allHeight - footerHeight;
  
        if (scrAbleHeight <= 0) {
          return 100; //전부 스크롤했을 때
        }
        return ((window.scrollY + windowHeight) / scrAbleHeight) * 100;
      }
    
      function btnTopPosition() {
        if (window.scrollY > 100) {
          btnTop.classList.add("on");
        } else {
          btnTop.classList.remove("on");
        }
        percentage.style.height = `${scrPercent * 1.25}%`;
      }
    
      function throttle(fn, wait) {
        let lastTime = 0;
        return function() {
          const now = new Date().getTime();
          if (now - lastTime >= wait) {
            fn.apply(this, arguments);
            lastTime = now;
          }
        };
      }
    
      btnTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(function () {
          scrPercent = calculateScrPercent();
          btnTopPosition();
        }, 300);
      });
    
      function commonResizeEvent() {
        allHeight = document.documentElement.scrollHeight;
        footerHeight = footer.offsetHeight;
        scrPercent = calculateScrPercent();
      }
    
      window.addEventListener("resize", function () {
        setTimeout(function () {
          commonResizeEvent();
          scrPercent = calculateScrPercent();
          btnTopPosition();
        }, 500);
      });
  
      window.addEventListener("scroll", throttle(function() {
        scrPercent = calculateScrPercent();
        btnTopPosition();
      }, 200));
    }
   
   

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
  let resizeTimeout;
  window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    var { slideWidth, slideMargin } = setSlideWidth(); // 슬라이드 크기 재설정
    moveSlide(currentIdx, slideWidth, slideMargin); // 현재 위치를 유지하면서 슬라이드 이동
  }, 200);
});

  // 각 li 요소에 클릭 이벤트를 추가
  const items = document.querySelectorAll('.bestList');

  items.forEach((item) => {
    const img = item.querySelector('img');
    const title = item.querySelector('h6');
  
    // img 클릭 이벤트 추가
    if (img) {
      img.addEventListener('click', (event) => {
        event.stopPropagation(); // 다른 요소로 이벤트 전파 막기
        const url = "https://taetae070.github.io/marketB.vanilaScript.ver/detail.html";
        window.location.href = url;
      });
    }
  
    // h6 클릭 이벤트 추가
    if (title) {
      title.addEventListener('click', (event) => {
        event.stopPropagation(); // 다른 요소로 이벤트 전파 막기
        const url = "https://taetae070.github.io/marketB.vanilaScript.ver/detail.html";
        window.location.href = url;
      });
    }
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

  //coupon 
    const section5 = document.querySelector(".random_coupon"),
    couponCon = section5.querySelector(".notice"), //coupon Container
    couponGrey = document.querySelector(".cp_before"), //긁기 전 회색박스
    couponGreyWidth = couponGrey.offsetWidth,
    couponGreyHeight = couponGrey.offsetHeight;


    function event_Sketch() {
      const couponDiv = `<div class="scratch"></div>`.repeat(32);
      document.querySelector(".grid").innerHTML = couponDiv;
      const scratchs = document.querySelectorAll(".scratch");
      const randomImg = Math.floor(Math.random() * 3) + 1;

        scratchs.forEach((scratch) => {
          scratch.style.backgroundImage = `url("img/main/coupon${randomImg}.png")`;
  
          const scratchOff = scratch.getBoundingClientRect();
          const couponOff = couponCon.getBoundingClientRect();
  
          scratch.style.backgroundSize = `${couponGreyWidth}px ${couponGreyHeight}px`;
          scratch.style.backgroundPositionX = `-${
            scratchOff.left - couponOff.left
          }px`;
          scratch.style.backgroundPositionY = `-${
            scratchOff.top - couponOff.top 
          }px`;
  
          scratch.addEventListener("mouseover", function () {
            this.classList.add("drawing");
            checkOpacity();
          });
        });
      
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

  //메인 슬라이드 button (쇼핑하기) 
  const mainEventUrl = "https://brand.naver.com/marketb/category/2242980862094ed0b89ce6d953f6f180?cp=2";
  const shopBtn = document.querySelector(".red_Btn_big");

  shopBtn.addEventListener("click", function() {
    location.href = mainEventUrl;
  });

});
