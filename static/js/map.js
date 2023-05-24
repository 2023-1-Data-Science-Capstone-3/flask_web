var markers = []; // 마커들을 담을 배열
var infowindows = []; // 정보창들을 담을 배열
var activeInfowindow = null; // 현재 열린 정보창

function initMap() {
  var mapContainer = document.getElementById('map');
  var mapOption = {
    center: new kakao.maps.LatLng(37.482896, 126.886887),
    level: 6,
  };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 기존의 마커들 생성
  createMarkers(map);

  // 받아온 마커 데이터를 처리하는 함수
  function handleMarkerData() {
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map: map
    });


  

    var content =
      '<div>' +
      address +
      '</div>' +
      '<div>캔 개수: ' +
      canCount +
      '</div>' +
      '<div>페트병 개수: ' +
      petCount +
      '</div>';
  
    var infowindow = new kakao.maps.InfoWindow({
      content: content
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      if (activeInfowindow === infowindow) {
        infowindow.close();
        activeInfowindow = null;
      } else {
        if (activeInfowindow) {
          activeInfowindow.close();
        }
        infowindow.open(map, marker);
        activeInfowindow = infowindow;
      }
    });

    markers.push(marker);
    infowindows.push(infowindow);
  }

  // 호출된 함수 실행
  handleMarkerData();

}



function createMarkers(map) {
  var positions = [
    
    {
      latlng: new kakao.maps.LatLng(37.484850, 126.886577),
      content: {
        address: "서울특별시 구로구 가리봉동 89-99",
        count: {
          pet: 12,
          can: 6,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.495065, 126.858047),
      content: {
        address: "서울특별시 구로구 개봉동 416-146",
        count: {
          pet: 1,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.500241, 126.851139),
      content: {
        address: "서울특별시 구로구 개봉동 134-8",
        count: {
          pet: 3,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.480161, 126.888695),
      content: {
        address: "서울특별시 구로구 가리봉동 125-16",
        count: {
          pet: 10,
          can: 7,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.482176, 126.886722),
      content: {
        address: "서울특별시 구로구 가리봉동 121-44",
        count: {
          pet: 8,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.484850, 126.886577),
      content: {
        address: "서울특별시 구로구 가리봉동 89-99",
        count: {
          pet: 2,
          can: 1,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501568, 126.847162),
      content: {
        address: "서울특별시 구로구 개봉동 492",
        count: {
          pet: 4,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501279, 126.845253),
      content: {
        address: "서울특별시 구로구 개봉동 63-35",
        count: {
          pet: 2,
          can: 4,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501074, 126.843823),
      content: {
        address: "서울특별시 구로구 개봉동 60-101",
        count: {
          pet: 5,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.499057, 126.851719),
      content: {
        address: "서울특별시 구로구 개봉동 139-61",
        count: {
          pet: 0,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.497599, 126.855601),
      content: {
        address: "서울특별시 구로구 개봉동 156-5",
        count: {
          pet: 4,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501568, 126.847162),
      content: {
        address: "서울특별시 구로구 개봉동 492",
        count: {
          pet: 0,
          can: 1,
        },
      },
    },
  ];


 // 기존의 마커들 생성
  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    var marker = new kakao.maps.Marker({
      map: map,
      position: position.latlng,
    });

    var infowindow = new kakao.maps.InfoWindow({
      content: createInfoWindowContent(
        position.content.address,
        position.content.count.pet,
        position.content.count.can
      ),
    });
    
    kakao.maps.event.addListener(
      marker,
      'click',
      (function (marker, infowindow) {
        var isOpen = false; // 인포윈도우가 열려있는지 여부를 저장하는 변수
        return function () {
          if (isOpen) {
            infowindow.close();
            isOpen = false;
          } else {
            infowindow.open(map, marker);
            isOpen = true;
          }
        };
      })(marker, infowindow)
    );

    markers.push(marker); // 마커를 배열에 추가
    infowindows.push(infowindow); // 정보창을 배열에 추가
  }
}

function createInfoWindowContent(address, petCount, canCount) {
  var content =
    '<div class="info-window">' +
    '<div class="address">' +
    address +
    '</div>' +
    '<div class="count">' +
    '페트병 개수: <span id="petCount">' +
    petCount +
    '</span><br>' +
    '캔 개수: <span id="canCount">' +
    canCount +
    '</span>' +
    '</div>' +
    '</div>';

  return content;
}

initMap();