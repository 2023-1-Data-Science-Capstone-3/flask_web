var markers = []; // 마커들을 담을 배열
var infowindows = []; // 정보창들을 담을 배열
var overlays = []; // 오버레이들을 담을 배열
var activeInfowindow = null; // 현재 열린 정보창


function initMap() {
  var mapContainer = document.getElementById('map');
  var mapOption = {
    center: new kakao.maps.LatLng(37.482896, 126.886887),
    level: 6,
  };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  createMarkers(map);

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
      latlng: new kakao.maps.LatLng(37.493655, 126.864313),
      content: {
        address: "서울특별시 구로구 개봉동 403-111",
        count: {
          pet: 1,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501096, 126.859564),
      content: {
        address: "서울특별시 구로구 개봉동 456-8",
        count: {
          pet: 3,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.478465, 126.887329),
      content: {
        address: "서울특별시 구로구 가리봉동 125-16",
        count: {
          pet: 10,
          can: 7,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.485243, 126.887874),
      content: {
        address: "서울특별시 구로구 가리봉동 121-44",
        count: {
          pet: 8,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.485816, 126.891048),
      content: {
        address: "서울특별시 구로구 가리봉동 89-99",
        count: {
          pet: 2,
          can: 1,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.502734, 126.849217),
      content: {
        address: "서울특별시 구로구 개봉동 492",
        count: {
          pet: 4,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501554, 126.845711),
      content: {
        address: "서울특별시 구로구 개봉동 63-35",
        count: {
          pet: 2,
          can: 4,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.500891, 126.844397),
      content: {
        address: "서울특별시 구로구 개봉동 60-101",
        count: {
          pet: 5,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.498926, 126.853445),
      content: {
        address: "서울특별시 구로구 개봉동 139-61",
        count: {
          pet: 0,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.499917, 126.853949),
      content: {
        address: "서울특별시 구로구 개봉동 156-5",
        count: {
          pet: 4,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.498065, 126.860364),
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

    var markerImage = new kakao.maps.MarkerImage(
      'static/image/trash.png',
      new kakao.maps.Size(30, 30) // 마커 이미지 크기
    );


    var marker = new kakao.maps.Marker({
      map: map,
      position: position.latlng,
      image: markerImage
    });
    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content.address // 인포윈도우에 표시할 내용
  });

  // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
  // 이벤트 리스너로는 클로저를 만들어 등록합니다 
  // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
  kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
  kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}
// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
  return function() {
      infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
  return function() {
      infowindow.close();
  };
}

}



initMap();
