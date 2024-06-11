$(document).ready(function () {
  // nav
  $(".menu_btn").click(function () {
    $(".category_list").show();
  });
  $(".category_list").mouseleave(function () {
    $(".category_list").hide();
  });

  // wish, cart btn
  let empty_like = $(".wish_Btn");
  empty_like.click(function () {
    $(this).toggleClass("on");
  });
  let putincart_btn = $(".cart_Btn");
  putincart_btn.click(function () {
    $(this).toggleClass("on");
  });

  //wish, cart alert
  let wishBtn = $(".wish_Btn");
  let cartBtn = $(".cart_Btn");
  let wishAlert01 = $(".wish_alert01");
  let wishAlert02 = $(".wish_alert02");
  let cartAlert01 = $(".cart_alert01");
  let cartAlert02 = $(".cart_alert02");

  wishBtn.click(function () {
    if ($(this).hasClass("on")) {
      wishAlert01.addClass("active");
      wishAlert02.removeClass("active");
    } else {
      wishAlert01.removeClass("active");
      wishAlert02.addClass("active");
    }
    for (let i = 0; i < 9999; i++) {
      setTimeout(function () {
        wishAlert01.removeClass("active");
        wishAlert02.removeClass("active");
      }, 2000);
    }
  });
  cartBtn.click(function () {
    if ($(this).hasClass("on")) {
      cartAlert01.addClass("active");
      cartAlert02.removeClass("active");
    } else {
      cartAlert01.removeClass("active");
      cartAlert02.addClass("active");
    }
    for (let i = 0; i < 9999; i++) {
      setTimeout(function () {
        cartAlert01.removeClass("active");
        cartAlert02.removeClass("active");
      }, 2000);
    }
  });
  // btn top
  let all_height = $("body, html").innerHeight();
  let scr_offset = $(window).scrollTop();
  let btnTop = $("#btn_top");
  let footerOffset = $("footer").offset().top;
  let footerHeight = $("footer").innerHeight();
  let scrPercent = calculateScrPercent();

  function calculateScrPercent() {
    let windowHeight = $(window).innerHeight();
    let contentHeight = all_height - footerHeight;

    if (contentHeight <= 0) {
      return 100;
    }
    return ((scr_offset + windowHeight) / contentHeight) * 100;
  }

  let percentage = $("#btn_top .percentage");

  function Common_resizeEvent() {
    all_height = $("body, html").innerHeight();
    scr_offset = $(window).scrollTop();
    footerOffset = $("footer").offset().top;
    footerHeight = $("footer").innerHeight();
    scrPercent = calculateScrPercent();
  }

  function btnTopPosition() {
    if (scr_offset > 100) {
      btnTop.addClass("on");
    } else {
      btnTop.removeClass("on");
    }
    percentage.css({ height: `${scrPercent * 1.2}%` });
  }

  $(window).scroll(function () {
    scr_offset = $(window).scrollTop();
    scrPercent = calculateScrPercent();
    btnTopPosition();
  });

  btnTop.click((e) => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300, function () {
      scr_offset = $(window).scrollTop();
      scrPercent = calculateScrPercent();
      btnTopPosition();
    });
  });

  $(window).resize(function () {
    setTimeout(() => {
      Common_resizeEvent();
      scrPercent = calculateScrPercent();
      btnTopPosition();
    }, 500);
  });

  //상품 슬라이드
  $(".slider_wrapper").each(function () {
    var sliderUl = $(this).find("ul"),
      slides = sliderUl.find("li"),
      currentIdx = 0,
      slideCount = slides.length,
      slideWidth = 450,
      slideMargin = 30,
      slideToShow = 4,
      prevBtn = $(this).find(".prev_btn"),
      nextBtn = $(this).find(".next_btn");

    // 슬라이드 배치
    sliderUl.width(slideWidth * slideCount + slideMargin * (slideCount - 1));

    // 슬라이드 이동함수
    function moveSlide(idx) {
      sliderUl.css("left", -idx * (slideWidth + slideMargin));
      currentIdx = idx;
    }

    // 버튼으로 이동하기
    nextBtn.on("click", function () {
      if (currentIdx === slideCount - slideToShow) {
        moveSlide(0);
      } else {
        moveSlide(currentIdx + 1);
      }
    });
    prevBtn.on("click", function () {
      if (currentIdx === 0) {
        moveSlide(slideCount - slideToShow);
      } else {
        moveSlide(currentIdx - 1);
      }
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
