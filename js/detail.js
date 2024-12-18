$(function () {
  //x버튼
  const $modalPop = $(".modal");
  const $closeBtn = $modalPop.find(".close");
  $closeBtn.on("click", function() {
      $modalPop.toggleClass("modalHidden");
  });
  // 확대이미지 right값 조절
  function magnifyImgResize(){
    const magnifyElement = $(".magnify");
    const baseWidth = 2300;
    const breakpoint = 1921;
    let currentWidth = $(window).width();

    function calculateRightValue(baseRight, times){
        let difference = baseWidth - currentWidth;
        let reduction = Math.floor(difference / 10) * times;
        let newRight = baseRight + reduction;
        magnifyElement.css('right', `${newRight}%`);
    }

    // 화면 너비가 1920 이상 2300 이하인 경우
    if (currentWidth >= breakpoint && currentWidth <= baseWidth) {
        calculateRightValue(12.5, 0.4);

    //1400 이상 1920 이하인 경우
    } else if (currentWidth > 1330 && currentWidth <= breakpoint) {
      // magnifyElement.css('right', `18.5%`);
      calculateRightValue(9, 0.25);
    
    //1700 이하인 경우
    } else {
      calculateRightValue(6, 0.3); 
    }
  }
  magnifyImgResize();

  $(window).on('resize', function() {
    location.reload(); 
  });
  

  $(".slider-single").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    useTransform: true,
    asNavFor: ".slider-nav",
    adaptiveHeight: true,
    infinite: false,
    variableWidth: false,
  });
  $(".slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-single",
    dots: false,
    focusOnSelect: true,
    infinite: false,
  });

  //zoom magnify
  $(".magnify").jfMagnify({ scale: "2.5" });
  let magnifyImg = $(".element_to_magnify img");
  let sliderHeight = $(".slider-single img").height();
  let sliderWidth = $(".slider-single img").width();
  magnifyImg.css({
    height: `${sliderHeight}px`,
    width: `${sliderWidth}px`
  });

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

  buy_number.on('change', function () {
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
  const optBtns = $(".color");
  const imgOptBtns = $(".c_img");

  function toggleActive(buttonClass) {
    const colorButton = $(`.color .${buttonClass}`);
    const imageButton = $(`.c_img .${buttonClass}`);
    const otherButtons = $(".btn_opt1, .btn_opt2").not(`.${buttonClass}`);

    colorButton.addClass("on");
    imageButton.addClass("on");
    otherButtons.removeClass("on");
  }

  optBtns.on("click", "button", function (e) {
    const clickedClass = $(this).attr("class").split(" ")[0];
    toggleActive(clickedClass);
  });

  imgOptBtns.on("click", "button", function (e) {
    const clickedClass = $(this).attr("class").split(" ")[0];
    toggleActive(clickedClass);
  });

  

  //scroll fix event
  function throttle(func, limit){
    /* inThrottle
    -함수 실행 막는 역할
    -한 번 함수가 실행되고 나면, inThrottle을 true로 설정하고, limit 시간이 지나기 전까지는 함수가 실행을 막는다.
    */
    let inThrottle; 
    return function(){
      const args = arguments;
      const context = this;
      if(!inThrottle){
        func.apply(context, args);
        inThrottle = true;
        setTimeout(()=> inThrottle = false, limit); // 일정 시간 후 다시 호출 가능 상태로 변경
      }
    }
  };
  
  const windowHeight = $(window).height(),
      windowWidth = $(window).width(),
      docHeight = $(document).height(),
      infoBox = $("article aside"),
      infoBoxRect = infoBox[0].getBoundingClientRect(),
      infoBoxLeft = infoBoxRect.left,
      infoBoxTopFixed = infoBoxRect.top;
      //고정해줄 위치
      leftPercentage = (infoBoxLeft / windowWidth) * 100,
      topPercentage = (infoBoxTopFixed / docHeight) * 100 ;

  $(window).on('scroll', _.throttle(function () {
    // console.log("throttle excuted");
    let infoOffsetTop = infoBox.offset().top;
    let footer = $("footer"),
    footerOffsetTop = footer.offset().top,
    infoBoxRect = infoBox[0].getBoundingClientRect(),
    infoBoxHeight = infoBox.height();
    let infoBoxTop = infoBoxRect.top;
    let scrollTop = $(window).scrollTop();

    console.log("infoOffsetTop", infoOffsetTop);

    if (windowWidth <= 1255) {
      return;
    };

    if (scrollTop > infoBoxTopFixed && footerOffsetTop > infoBoxTop + infoBoxHeight + 15 && scrollTop <= footerOffsetTop - infoBoxHeight) {
      // 처음 스크롤 내릴 때, 푸터에 아직 안 닿았을 때, 푸터찍고 스크롤 업할때
      // console.log("Condition: Fix infoBox");
      infoBox.css({
        position: "fixed",
        left: `${leftPercentage}%`,
        top: `${topPercentage}%`,
      });
    } else if ( scrollTop + windowHeight >= footerOffsetTop ) {
      // 푸터에 닿았을 때
      // console.log("Condition: infoBox touches footer");
      let footerHeight = footer.height();
      let topValue = (footerOffsetTop - infoBoxHeight - footerHeight -200 );
      infoBox.css({
        position: "absolute",
        left: "84%",
        top: `${topValue}px`,
      });
    }else if (scrollTop < infoBoxTopFixed + 30) {
      // 푸터 찍고, 상단 도착했을 때
      console.log("Condition: Scroll back above infoBox");
      infoBox.css({
        position: "absolute",
        left: "84%",
        top: "-3%"
      });
    }
  }, 300));
  
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
    let scoreNum = parseFloat($this.attr("data-rate"));
    let fullStars = Math.floor(scoreNum); 
    let halfStar = (scoreNum % 1) * 100;  //나머지

    $this.find(".star-wrap .star").css({ width: "0%" });
    for(let i = 0; i < fullStars; i++){
      $this.find(".star-wrap").eq(i).find(".star").css({ width: "100%" });
    }
    
    if(halfStar > 0){
      let halfStarIndex = fullStars;
      $this.find(".star-wrap").eq(halfStarIndex).find(".star").css({ width: halfStar + "%" });
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

  numberBtn.on('click',((e) => {
    e.preventDefault();
    $(this).toggleClass("clicked");
    displayRow($(e.target).parent().index()); //li index
  }));

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

  nextPageBtn.on("click", () => {
    ++pageActiveIdx;
    displayRow(pageActiveIdx * maxPageNum);
    displayPage(pageActiveIdx);
  });
  
  prevPageBtn.on("click", () => {
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
  recentBtn.on('click', function () {
    sortedDates.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
    tableBody.empty();

    sortedDates.forEach(function (item) {
      let matchingTR = newrowTR.filter(`[data-index="${item.index}"]`);
      tableBody.append(matchingTR);
    });
  });
  // console.log(sortedDates);

  //평점높은순
  rateHighBtn.on('click', function () {
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
  rateRowBtn.on('click', function () {
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
  let moreButton = $(".more_btn_wrap");
  moreButton.on("click", function () {
    let review_img = $(".review_photo_3ndwrap");
    review_img.toggleClass("on");
  });

  //filter 버튼 (텍스트, 사진 후기)
  let text_only_Btn = $(".review_text");
  let photo_only_Btn = $(".review_photobtn");
  let photoGroup = $(".review_photo_wrap");
  let textGroup = $(".review03_wrap");

  photo_only_Btn.on("click", function () {
    photoGroup.removeClass("hide");
    textGroup.addClass("hide");
  });

  text_only_Btn.on("click", function () {
    photoGroup.addClass("hide");
    textGroup.removeClass("hide");
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
      slideToShow = 4,
      prevBtn = $(this).find(".prev_btn"),
      nextBtn = $(this).find(".next_btn");

    // ul 너비지정
    slide_UL.css("width, 80%");

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


  $(".cart_wish_BtnWrapper .wish_Btn, .cart_wish_BtnWrapper .cart_Btn").on("click", function () {
    const button = $(this);
    let btnParent = button.parents().eq(4);
  
    if (!btnParent.hasClass("section02")) {
      btnParent = $(".slider_wrapper");
    }
  
    const isWishButton = button.hasClass("wish_Btn");
    const alertType = isWishButton ? "wish" : "cart";
  
    const alertOn = btnParent.find(`.alerts.${alertType}_alert01`);
    const alertOff = btnParent.find(`.alerts.${alertType}_alert02`);
  
    button.toggleClass("on");
  
    if (button.hasClass("on")) {
      alertOn.addClass("active");
      alertOff.removeClass("active");
    } else {
      alertOn.removeClass("active");
      alertOff.addClass("active");
    }
  
    setTimeout(() => {
      alertOn.removeClass("active");
      alertOff.removeClass("active");
    }, 4000);
  });
  
});
