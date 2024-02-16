'use strict';
{
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// インラインブートストラップローダーのコールバック関数としてinitMapを登録
// google.maps.__ib__ = initMap;
window.initMap = initMap;



}