document.addEventListener("DOMContentLoaded", function () {
  makeMap(37.7292709, 126.7637605, "파주운정 컨셉 스토어", 1);

  function makeMap(lat, lng, name, id) {
      let mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3,
        };
      let map = new kakao.maps.Map(mapContainer, mapOption);

      let mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      //map marker
      const imageSrc = "http://taetaeky.dothome.co.kr/img/map/marker.png",
        imageSize = new kakao.maps.Size(40, 40),
        imageOption = { offset: new kakao.maps.Point(20, 40) };
      const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(lat, lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map);

      let iwContent = `
              <div class="store_info R">                  
                  <h3>${name}</h3>       
                  <button type="button" data-id="${id}">매장 상세보기</button>               
              </div>       
          `;
      const iwPosition = new kakao.maps.LatLng(lat, lng); //매장 인포창의 위치는 마커와 동일
      const infowindow = new kakao.maps.InfoWindow({
        position: iwPosition, //인포창 위치
        content: iwContent,
      });
      infowindow.open(map, marker);
  }

  const store = document.querySelectorAll(".store_list > div");
  store.forEach((e) => {
    e.addEventListener("click", function () {
      let lat = this.getAttribute("data-lat");
      let lng = this.getAttribute("data-lng");
      let id = this.getAttribute("data-id");
      let name = this.querySelector("h3").textContent;
      makeMap(lat, lng, name, id);
    });
  });

  // console.log("DOMContentLoaded event triggered");

  const mapElement = document.getElementById("map");
  if (mapElement) {
    // console.log("map element found:", mapElement);

    mapElement.addEventListener("click", (event) => {
      // console.log("Click detected inside map element");

      const infoBtn = event.target.closest("button");
      if (infoBtn) {
        // console.log("Button inside map clicked:", infoBtn);

        const popId = infoBtn.getAttribute("data-id");
        const targetPopup = document.querySelector(`.infoPopup[data-id="${popId}"]`);

        if (targetPopup) {
          document.querySelectorAll(".infoPopup").forEach((popup) => {
            popup.style.display = "none";
          });

          targetPopup.style.display = "block";
          // console.log("Opening popup with ID:", targetPopup.getAttribute("data-id"));
        } else {
          console.error(`팝업을 찾을 수 없습니다. data-id: ${popId}`);
        }
      } else {
        console.warn("Clicked element is not a button");
      }
    });
  } else {
    console.error("map element not found");
  }

  // 팝업 닫기 버튼
  document.body.addEventListener("click", (event) => {
    const closeBtn = event.target.closest(".close");
    if (closeBtn) {
      const popup = closeBtn.closest(".infoPopup");
      if (popup) {
        popup.style.display = "none";
        // console.log("Closing popup");
      }
    }
  });
});
