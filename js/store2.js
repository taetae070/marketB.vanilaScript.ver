$(document).ready(function () {
  makeMap(37.7292709, 126.7637605, "파주운정 컨셉 스토어", 1);
  function makeMap(lat, lng, name, id) {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    //마커이미지 변경---------------------------------
    var imageSrc = "http://tkyung.dothome.co.kr/marketB/img/map/marker.png", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(20, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(lat, lng); // 마커가 표시될 위치입니다

    // 마커생성
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    // 마커 위에 표시할 인포윈도우 컨텐츠
    var iwContent = `
      <div class="store_info R">                  
          <h3>${name}</h3>       
          <button type="button">매장 상세보기</button>               
      </div>       
          `;

    var iwPosition = new kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다
    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    // 마커 위에 인포윈도우를 표시합니다.
    infowindow.open(map, marker);

    let store = $(".store_list > div");
    store.click(function () {
      let lat = $(this).attr("data-lat");
      let lng = $(this).attr("data-lng");
      let id = $(this).attr("data-id");
      let name = $(this).find("h3").text();
      makeMap(lat, lng, name, id);
      $("#map").attr("data-id", id);
    });
  }

  //카카오 윈도우 css변경
  let info_Top = $(".store_info").parent();
  info_Top.css({
    // left: "-1px",
    // top: "10%",
    // right: "-1px",
    left: "-1px",
    top: "-1px",
    // right: "-1px",
  });

  let info_setA = $(".store_info").parent().parent();
  info_setA.css({
    width: "0",
    height: "0",
    top: "137px",
  });

  //모달창
  //button: store_info에 있는 버튼
  //$(this): #map
  //data-id: html > store_list에 있음
  let map_btn = $("#map");
  map_btn.click("button", function () {
    let target = "#info_panel" + $(this).attr("data-id");
    $(target).fadeIn();
    //#info_panel1
  });

  //모달창 닫는 버튼
  let x_btn = $(".info_first .close");

  x_btn.click("button", function () {
    let target = $(this).closest(".info_panel");
    $(target).fadeOut();
  });

  //form select 버튼
  let region_Tap = $(".form-select .region");
  let town_Tap = $(".form-select .town");

  var selects = []; // 빈 배열 생성

  region_Tap.each(function () {
    selects.push($(this).val()); // 각 요소의 값을 배열에 추가
  });

  const selects = Array(100)
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

  region_Tap.click(function () {
    let regionValue = $(this).val();
    return regionValue;
    console.log(regionValue);
  });

  // let regionValue = $(this).val();

  //   if (regionValue === town_Tap.val()) {
  //     town_Tap.css("display", "block");
  //   } else {
  //     town_Tap.css("display", "none");
  //   }
  //   console.log(regionValue);
});
