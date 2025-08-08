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

    // Map marker
    const imageSrc = "http://taetaeky.dothome.co.kr/img/map/marker.png";
    let imageSize = new kakao.maps.Size(40, 40);
    let imageOption = { offset: new kakao.maps.Point(20, 40) };

    // Resize marker for viewport <= 500px
    function resizeMarker() {
      if (window.innerWidth <= 500) {
        imageSize = new kakao.maps.Size(16, 16);
        imageOption = { offset: new kakao.maps.Point(8, 16) };
      } else {
        imageSize = new kakao.maps.Size(40, 40);
        imageOption = { offset: new kakao.maps.Point(20, 40) };
      }
    }
    resizeMarker();

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    marker.setMap(map);

    // Update marker on resize
    window.addEventListener("resize", () => {
      marker.setMap(null);
      resizeMarker();
      const newMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const newMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: newMarkerImage,
      });
      newMarker.setMap(map);
    });

    let iwContent = `
      <div class="store_info R">                  
        <h3>${name}</h3>       
        <button type="button" data-id="${id}">매장 상세보기</button>               
      </div>       
    `;
    const iwPosition = new kakao.maps.LatLng(lat, lng); // Info window position same as marker
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition, // Info window position
      content: iwContent,
    });
    infowindow.open(map, marker);
  }

  const lastWidth = window.innerWidth;
  if (lastWidth < 500 && !localStorage.getItem("reloaded")) {
    localStorage.setItem("reloaded", "true"); 
    location.reload(); 
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

  const mapElement = document.getElementById("map");
  if (mapElement) {
    mapElement.addEventListener("click", (event) => {
      const infoBtn = event.target.closest("button");
      if (infoBtn) {
        const popId = infoBtn.getAttribute("data-id");
        const targetPopup = document.querySelector(`.infoPopup[data-id="${popId}"]`);

        if (targetPopup) {
          document.querySelectorAll(".infoPopup").forEach((popup) => {
            popup.style.display = "none";
          });

          targetPopup.style.display = "block";
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

  //css
  const storeInfo = document.querySelector('.store_info');
  const parentOfParent = storeInfo.parentElement.parentElement;

  parentOfParent.style.background = 'none'; 
  parentOfParent.style.border = 'none';    
  parentOfParent.style.width = 'auto';   

  // Close popup
  document.body.addEventListener("click", (event) => {
    const closeBtn = event.target.closest(".close");
    if (closeBtn) {
      const popup = closeBtn.closest(".infoPopup");
      if (popup) {
        popup.style.display = "none";
      }
    }
  });
});
