document.addEventListener("DOMContentLoaded", function () {
  makeMap(37.7292709, 126.7637605, "파주운정 컨셉 스토어", 1);

  function makeMap(lat, lng, name, id) {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var imageSrc = "http://taetaeky.dothome.co.kr/img/map/marker.png",
      imageSize = new kakao.maps.Size(40, 40),
      imageOption = { offset: new kakao.maps.Point(20, 40) };

    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(lat, lng);

    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);

    var iwContent = `
            <div class="store_info R">                  
                <h3>${name}</h3>       
                <button type="button">매장 상세보기</button>               
            </div>       
        `;

    var iwPosition = new kakao.maps.LatLng(lat, lng);

    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infowindow.open(map, marker);

    var store = document.querySelectorAll(".store_list > div");
    store.forEach(function (el) {
      el.addEventListener("click", function () {
        let lat = this.getAttribute("data-lat");
        let lng = this.getAttribute("data-lng");
        let id = this.getAttribute("data-id");
        let name = this.querySelector("h3").textContent;
        makeMap(lat, lng, name, id);
        document.getElementById("map").setAttribute("data-id", id);
      });
    });
  }

  // 지역 filter
  const selectElement = document.getElementById("regionSelect");
  const storeElements = document.querySelectorAll(".store_name");

  selectElement.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    storeElements.forEach((storeElement) => {
      storeElement.style.display = "none";
    });

    storeElements.forEach((storeElement) => {
      if (storeElement.getAttribute("value") === selectedValue) {
        storeElement.style.display = "block";

        // const listChildren = storeElement.children;
        // for (let i = 0; i < listChildren.length; i++) {
        //   listChildren.classList.add("marginB");
        // }
      }
    });
  });

  //display
  var info_Top = document.querySelectorAll(".store_info").parentNode;
  info_Top.style.left = "-1px";
  info_Top.style.top = "-1px";

  var info_setA =
    document.querySelectorAll(".store_info").parentNode.parentNode;
  info_setA.style.width = "0";
  info_setA.style.height = "0";
  info_setA.style.top = "137px";

  var map_btn = document.getElementById("map");
  map_btn.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      let target = "#info_panel" + this.getAttribute("data-id");
      document.querySelector(target).style.display = "block";
    }
  });

  var closBtn = document.querySelectorAll(".info_first .close");
  closBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let target = this.closest(".info_panel");
      target.style.display = "none";
    });
  });

  var regionTap = document.querySelectorAll(".form-select .region");
  //   var town_Tap = document.querySelectorAll(".form-select .town");

  var selects = [];
  regionTap.forEach(function (el) {
    selects.push(el.value);
  });

  regionTap.forEach(function (el) {
    el.addEventListener("click", function () {
      let regionValue = this.value;
      console.log(regionValue);
      return regionValue;
    });
  });
});
