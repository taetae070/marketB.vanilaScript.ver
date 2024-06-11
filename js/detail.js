$(document).ready(function () {
  //zoom slide
  $(".slider-single").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    useTransform: true,
    asNavFor: ".slider-nav",
  });
  $(".slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-single",
    dots: false,
    focusOnSelect: true,
  });

  //zoom magnify
  $(".magnify").jfMagnify({ scale: "2.5" });

  //모달
  let modalPop = $(".modal");
  let closeBtn = $(".close");
  let buyBtn = $(".btn_shop");
  let modalGroup = $(".modal_group");
  let noBtn = $(".noNeed_btn");

  buyBtn.on("click", function () {
    modalPop.addClass("on");
  });
  closeBtn.on("click", function () {
    modalPop.removeClass("on");
    modalGroup.removeClass("on");
  });

  //구입갯수, 최종구입가
  let btn_minus = $(".b_opt > .minus"),
    btn_plus = $(".b_opt > .plus"),
    buy_number = $(".b_opt> #buy_num"),
    totalcost = $(".totalcost"),
    buy_priceText = $(".P_info1 .price").text(),
    buy_price = buy_priceText.replace(/\D/g, ""),
    i = buy_number.val();

  buy_number.change(function () {
    i = buy_number.val();
    buyTotal = i * buy_price;
    totalcost.text("￦" + buyTotal.toLocaleString());
    if (i == 10) {
      modalGroup.addClass("on");
    }
  });

  btn_plus.on("click", function () {
    i = buy_number.val();
    i++;
    buy_number.val(i);
    buyTotal = i * buy_price;
    totalcost.text("￦" + buyTotal.toLocaleString());
    if (i == 10) {
      modalGroup.addClass("on");
    }
  });
  btn_minus.on("click", function () {
    if (i > 1) {
      i = buy_number.val();
      i--;
      buy_number.val(i);
      buyTotal = i * buy_price;
      totalcost.text("￦" + buyTotal.toLocaleString());
    }
  });

  // 필요없어요 버튼
  noBtn.on("click", function () {
    modalGroup.removeClass("on");
  });

  //컬러 선택
  let opt01_btn = $(".btn_opt1");
  let opt02_btn = $(".btn_opt2");
  let opt_btn = $(".color button");

  opt_btn.click(function () {
    buyTotal = buy_priceText;
    totalcost.text("￦" + buyTotal.toLocaleString());
    if ($(this).hasClass("btn_opt1")) {
      opt01_btn.toggleClass("on");
      opt02_btn.removeClass("on");
    } else {
      opt02_btn.toggleClass("on");
      opt01_btn.removeClass("on");
    }
  });

  //scroll fix event
  let buyfixed = $("article .section02");
  let buyfixedOST = buyfixed.offset().top;
  let footerOst = $("footer").offset().top;
  let buyfixed02 = footerOst - buyfixed.outerHeight() - 10;
  let articleOst = $(".Pd_title").offset().top - 40 - 18;
  console.log(articleOst);
  console.log(buyfixedOST);

  $(window).scroll(function () {
    //처음 스크롤할 때
    buyfixed.css({
      position: "fixed",
      top: "2%",
      right: "43%",
      marginRight: "-640px",
      zIndex: 100,
    });

    //멈추는 구간
    if ($(this).scrollTop() > buyfixed02) {
      buyfixed.css({
        position: "absolute",
        top: "340%",
        marginRight: "-650px",
        zIndex: 100,
      });
    } else if ($(this).scrollTop() <= articleOst) {
      buyfixed.css({
        right: "43%",
        position: "absolute",
        marginRight: "-658px",
      });
    } else {
    }
  });

  //review page clone
  let reviewTD = $("table tbody tr td");
  function put_reviews() {
    let reviewText = `<div class="review_first F">
    <div class="rating_wrap F">
        <div class="rating F" data-rate="">                               
            <div class="star-wrap">
                <div class="star">
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <div class="star-wrap">
                <div class="star">
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <div class="star-wrap">
                <div class="star">
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <div class="star-wrap">
                <div class="star">
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <div class="star-wrap">
                <div class="star">
                    <i class="fas fa-star"></i>
                </div>
            </div>
        </div>
        <div class="review_random_id">
            <span> </span>                                                      
        </div>                                                  
    </div>
    <div class="random_wrap F">
        <div class="review_random_date">
            <span id="randomNumber date01" ></span>                                                      
        </div>  
    </div>
</div>`;

    reviewTD.each(function () {
      $(this).append(reviewText);
    });

    //rate random
    $(".rating").each(function () {
      let randomRate = (Math.random() * 2 + 3).toFixed(1);
      if (randomRate > 5) {
        randomRate = 5;
      }
      $(this).attr("data-rate", randomRate);
    });
  }
  put_reviews();

  //tr clone
  let reviewTR = $("tbody tr");

  function repeatRows() {
    let repeatCount = 7;
    let clonedRow = reviewTR.clone(); //기존tr 6개 복사

    for (let i = 0; i < repeatCount; i++) {
      let newRow = clonedRow.clone().addClass("new-row"); // 새로운 tr 요소 생성 및 클래스 추가
      $("table tbody").append(newRow);
    }
  }
  repeatRows();
  let newrowTR = $("table tbody tr");

  let targetRows = $("table tbody tr").slice(0, 5);
  targetRows.addClass("existing-row");
  newrowTR.eq(5).addClass("new-row");
  let newRows = $(".new-row");
  let exiRows = $(".existing-row");
  let allRows = newRows.length + exiRows.length;

  //후기 최종 별점
  let all_rates = $(".rating")
    .map(function () {
      return parseInt($(this).attr("data-rate"));
    })
    .get();

  let rates_sum = all_rates.reduce(function (a, b) {
    return a + b;
  }, 0);

  let rates_average = (rates_sum / all_rates.length).toFixed(1);
  console.log(rates_average);

  let final_rate = $(".review_ave .rating");
  final_rate.attr("data-rate", rates_average);

  //star rating
  let rating = $(".rating");
  rating.each(function () {
    let $this = $(this);
    let scoreNum = $this.attr("data-rate");
    let scoreArr = scoreNum.split(".");
    console.log(scoreArr);
    if (scoreArr.length > 1) {
      for (let i = 0; i < scoreArr[0]; i++) {
        $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
      }
      $this
        .find(".star-wrap")
        .eq(scoreArr[0])
        .find(".star")
        .css({ width: scoreArr[1] + "0%" });
    } else {
      for (let i = 0; i < scoreNum; i++) {
        $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
      }
    }
  });

  //id, date random
  const userids = () => {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < 7; i++) {
      if (0 <= i && i < 4) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      } else {
        result += "*";
      }
    }
    return result;
  };
  const id_list = $(".review_random_id span");

  //date 배열설정
  const review_date = $(".review_random_date");
  const start = new Date(2023, 1, 1);
  const end = new Date();

  function getRandomDate(start, end) {
    const startDate = start.getTime();
    const endDate = end.getTime();
    return new Date(startDate + Math.random() * (endDate - startDate));
  }

  const msgs = Array(100)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      userID: userids(),
      timestamp: getRandomDate(start, end),
    }));

  const map1 = msgs.map((x, i) => {
    const date = new Date(x.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return {
      id: x.id,
      userID: userids(),
      timestamp: `${year}-${month}-${day}`,
    };
  });

  for (let i = 0; i < map1.length; i++) {
    let random_index = Math.floor(Math.random() * map1.length);
    id_list.eq(i).html(map1[random_index].userID);
    review_date.eq(i).html(map1[random_index].timestamp);
  }

  //pagenation
  let rowsPerPage = 5;
  let rowsCount = allRows;
  let pageCount = Math.ceil(rowsCount / rowsPerPage);
  let numbers = $("#numbers");
  console.log(pageCount);

  let prevPageBtn = $(".pagination .fa-arrow-left");
  let nextPageBtn = $(".pagination .fa-arrow-right");

  let maxPageNum = 5;
  let pageActiveIdx = 0;

  for (let i = 1; i < pageCount; i++) {
    numbers.append(`<li><a href="">${i}</a></li>`);
  }

  let numberBtn = numbers.find("a");

  numberBtn.click((e) => {
    e.preventDefault();
    $(this).toggleClass("clicked");
    displayRow($(e.target).parent().index()); //li index
  });

  function displayRow(num) {
    let reviewTR = $("table tbody tr td");
    reviewTR.hide();

    let start = num * rowsPerPage;
    let end = start + rowsPerPage;

    reviewTR.slice(start, end).show();

    numberBtn.removeClass("active");
    numberBtn.eq(num).addClass("active");
  }
  displayRow(0);
  numberBtn.eq(0).find("a").trigger("click");

  function displayPage(num) {
    numberBtn.hide();
    let totalPageCount = Math.ceil(pageCount / maxPageNum);
    let start = num * maxPageNum;
    let end = start + maxPageNum;
    numberBtn.slice(start, end).show();

    if (pageActiveIdx === 0) {
      prevPageBtn.hide();
    } else {
      prevPageBtn.show();
    }
    if (pageActiveIdx === totalPageCount - 1) {
      nextPageBtn.hide();
    } else {
      nextPageBtn.show();
    }
  }

  nextPageBtn.click(() => {
    ++pageActiveIdx;
    displayRow(pageActiveIdx * maxPageNum);
    displayPage(pageActiveIdx);
  });

  prevPageBtn.click(() => {
    --pageActiveIdx;
    displayRow(pageActiveIdx * maxPageNum);
    displayPage(pageActiveIdx);
  });
  displayPage(0);

  //filter btn
  let recentBtn = $(".recent_btn button");
  let rateHighBtn = $(".rateH_btn button");
  let rateRowBtn = $(".rateL_btn button");
  let sortedDates = [];
  let tableBody = $("table tbody");

  newrowTR.each(function (index) {
    $(this).attr("data-index", index);

    let dateValues = $(this).find(".review_random_date").text();
    let rateValues = $(this).find(".rating").attr("data-rate");

    sortedDates.push({
      index: index,
      date: dateValues,
      star: rateValues,
    });
  });

  //최신순
  recentBtn.click(function () {
    sortedDates.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
    tableBody.empty();

    sortedDates.forEach(function (item) {
      let matchingTR = newrowTR.filter(`[data-index="${item.index}"]`);
      tableBody.append(matchingTR);
    });
  });
  console.log(sortedDates);

  //평점높은순
  rateHighBtn.click(function () {
    sortedDates.sort(function (a, b) {
      return b.star.localeCompare(a.star);
    });

    tableBody.empty();

    sortedDates.forEach(function (item) {
      let matchingTR = newrowTR.filter(`[data-index="${item.index}"]`);
      tableBody.append(matchingTR);
    });
  });

  //평점낮은순
  rateRowBtn.click(function () {
    sortedDates.sort(function (a, b) {
      return a.star.localeCompare(b.star);
    });

    tableBody.empty();

    sortedDates.forEach(function (item) {
      let matchingTR = newrowTR.filter(`[data-index="${item.index}"]`);
      tableBody.append(matchingTR);
    });
  });

  //review more버튼
  let moreButton = $(".review_photo_wrap .more_btn_wrap");
  moreButton.on("click", function () {
    let review_img = $(".review_photo_3ndwrap");
    review_img.toggleClass("on");
  });

  //filter 버튼 (텍스트, 사진 후기)
  let text_only_Btn = $(".review_text");
  let photo_only_Btn = $(".review_photobtn");
  let photoGroup = $(".review_photo_wrap");
  let textGroup = $(".review03_wrap");
  let clickCount = 0;

  photo_only_Btn.on("click", function () {
    clickCount++;

    if (clickCount % 2 === 0) {
      photoGroup.removeClass("hide");
      textGroup.removeClass("hide");
    } else {
      photoGroup.removeClass("hide");
      textGroup.addClass("hide");
      clickCount = 1;
    }
  });

  text_only_Btn.on("click", function () {
    clickCount++;

    if (clickCount % 2 === 0) {
      photoGroup.removeClass("hide");
      textGroup.removeClass("hide");
    } else {
      photoGroup.addClass("hide");
      textGroup.removeClass("hide");
      clickCount = 1;
    }
  });

  // 추천상품
  let slide_start = $(".slider_wrapper");
  let imgWidth = $(".bestList .bestItem img");
  let slide_UL = slide_start.find("ul");
  let rowgap_value = parseInt(slide_UL.css("row-gap"));

  slide_start.each(function () {
    let slides = slide_UL.find("li"),
      currentIdx = 0,
      slideCount = slides.length,
      slideWidth = imgWidth.width(),
      slideToShow = 3,
      prevBtn = $(this).find(".prev_btn"),
      nextBtn = $(this).find(".next_btn");

    // ul 너비지정
    slide_UL.width(slideWidth * slideCount + rowgap_value * (slideCount - 1));

    // 슬라이드 이동함수
    function moveSlide(idx) {
      slide_UL.css("left", -idx * (slideWidth + rowgap_value));
      currentIdx = idx;
    }
    moveSlide(currentIdx);

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
});
