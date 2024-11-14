document.addEventListener("DOMContentLoaded", function () {
    //x 버튼 
    const modalPop = document.querySelector(".first_modal");
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


  // wish, cart btn의 로직: on -> active -> 알람뜸
  const slidesContainers = document.querySelectorAll(".slider_wrapper");
  slidesContainers.forEach((slidesContainer) => {
    slidesContainer.addEventListener('click', (e) => {
      const target = e.target.closest(".wish_Btn, .cart_Btn");
      
      if(target){
        target.classList.toggle("on");
      
        //alert 종류를 객체로 저장
        const alertObject = {
          wish:{
            on: slidesContainer.querySelector(".wish_alert01"),
            off: slidesContainer.querySelector(".wish_alert02"),
          },
          cart:{
            on: slidesContainer.querySelector(".cart_alert01"),
            off: slidesContainer.querySelector(".cart_alert02"),
          }
        };

        //클릭한 버튼에 따라 알람 활성화
        const alertType = target.classList.contains("wish_Btn") ? "wish" : "cart";
        const alertOn = alertObject[alertType].on;
        const alertOff = alertObject[alertType].off;

        if (target.classList.contains("on")) {
          alertOn.classList.add("active");
          alertOff.classList.remove("active");
        } else {
          alertOn.classList.remove("active");
          alertOff.classList.add("active");
        }

        setTimeout(() => {
          alertOn.classList.remove("active");
          alertOff.classList.remove("active");
        }, 4000);
      }
    })
  })
  // 각 li 요소에 클릭 이벤트를 추가
  const items = document.querySelectorAll('.bestList');

  items.forEach((item) => {
    const img = item.querySelector('img');
    const title = item.querySelector('h6');
    if (img) {
      img.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const url = "https://taetae070.github.io/marketB.vanilaScript.ver/detail.html";
        window.location.href = url;
      });
    }

    if (title) {
      title.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const url = "https://taetae070.github.io/marketB.vanilaScript.ver/detail.html";
        window.location.href = url;
      });
    }
  });

  const slide_start = document.querySelectorAll(".slider_wrapper");
  const imgWidth = document.querySelector(".bestList .bestItem img").width;
  const rowgap_value = parseInt(
    window.getComputedStyle(slide_start[0].querySelector("ul")).rowGap
  );

  slide_start.forEach(function (slider) {
    const slideUl = slider.querySelector("ul");
    const slides = slideUl.querySelectorAll("li");
    let currentIdx = 0;
    const slideCount = slides.length;
    const slideWidth = imgWidth;
    const slideToShow = 3;
    const prevBtn = slider.querySelector(".prev_btn");
    const nextBtn = slider.querySelector(".next_btn");

    // ul 너비지정
    slideUl.style.width =
      slideWidth * slideCount + rowgap_value * (slideCount - 1) + "px";

    // 슬라이드 이동함수
    function moveSlide(idx) {
      slideUl.style.left = -idx * (slideWidth + rowgap_value) + "px";
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
