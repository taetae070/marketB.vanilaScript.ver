document.addEventListener("DOMContentLoaded", function () {
  //x 버튼 ㅇㅋ
  const modalPop = document.querySelector("modal");
  const closeBtn = modalPop.querySelector(".close");

  closeBtn.addEventListener("click", function () {
    modalPop.classList.toggle("modalHidden");
  });

  //슬라이드 좌우 버튼 ㅇㅋ
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

  //검색창 버튼 ㅇㅋ
  const gnb = document.querySelector(".gnb_search"),
    SearchInput = document.querySelector(".gnb_search input"),
    SearchBtn = document.querySelector(".icon_search > button");
  SearchBtn.addEventListener("click", function () {
    gnb.classList.toggle("on");
    SearchInput.classList.toggle("on");
  });

  //section01 슬라이드 ㅇㅋ
  const slideWrap = document.querySelector(".slider_wrapper"),
    imgWidth = document.querySelector(".bestList .bestItem img").offsetWidth,
    slideUl = slideWrap.querySelector("ul"),
    slideLi = slideWrap.querySelectorAll("li"),
    imgGap = getComputedStyle(slideUl).getPropertyValue("gap"),
    slideToShow = 4,
    prevBtn = document.querySelector(".prev_btn"),
    nextBtn = document.querySelector(".next_btn");

  let currentIdx = 0;
  function moveSlide(idx) {
    currentIdx = idx;
    slideUl.style.left = -idx * (imgWidth + parseInt(imgGap, 10)) + "px";
  }

  // Button click event ㅇㅋ
  nextBtn.addEventListener("click", function () {
    if (currentIdx === slideLi.length - slideToShow) {
      //마지막 슬라이드-3이면 첫 슬라이드로 이동
      moveSlide(0);
    } else {
      moveSlide(currentIdx + 1);
    }
  });
  prevBtn.addEventListener("click", function () {
    if (currentIdx === 0) {
      moveSlide(slideLi.length - slideToShow);
    } else {
      moveSlide(currentIdx - 1);
    }
  });
  moveSlide(0);

  //random star rating
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

  //magazine ㅇㅋ
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circleElement) => {
    const circleInfo = circleElement.closest("li").querySelector(".magaInner");
    circleElement.addEventListener("mouseover", () => {
      if (circleInfo) circleInfo.style.opacity = "1";
    });
    circleElement.addEventListener("mouseout", () => {
      if (circleInfo) circleInfo.style.opacity = "0";
    });
    console.log(circleElement);
  });

  //coupon
  const section5 = document.querySelector(".random_coupon"),
    couponCon = section5.querySelector(".notice"), //coupon Container
    couponGrey = document.querySelector(".cp_before"), //긁기 전 이미지
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

  // const section5 = document.querySelector(".random_coupon"),
  //   couponCon = section5.querySelector(".notice"), //coupon Container
  //   couponGrey = document.querySelector(".cp_before"), //긁기 전 이미지
  //   couponGreyWidth = couponGrey.offsetWidth(),
  //   couponGreyHeight = couponGrey.offsetHeight(),
  //   couponOff = couponCon.offset();

  // function event_Sketch() {
  //   let randomImg = Math.floor(Math.random() * 3) + 1;
  //   let couponDiv = `<div class="scratch"></div>`.repeat(32);
  //   document.querySelector(".grid").innerHTML = couponDiv;
  //   couponCon
  //     .find(".scratch")
  //     .css("background-image", `url("img/main/coupon${randomImg}.png")`);

  //   let scratch = couponCon.find(".scratch"); //임의로 만든 비어있는 클래스
  //   scratch.each(function (idx, item) {
  //     scratch.eq(idx).css({
  //       "background-size": `${couponGreyWidth}px ${couponGreyHeight}px`,
  //       "background-position-x": `-${
  //         scratch.eq(idx).offset().left - couponOff.left
  //       }px`,
  //       "background-position-y": `-${
  //         scratch.eq(idx).offset().top - couponOff.top
  //       }px`,
  //     });
  //   });
  //   scratch.mouseover(function () {
  //     $(this).addClass("drawing");
  //     checkOpacity();
  //   });
  // }
  // event_Sketch();

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
    // aside_span.classList.add("icon-text A");
    // promo_p.css({
    //   display: "none",
    // });
  }
});
