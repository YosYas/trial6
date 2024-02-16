'use strict';
{
  // GoogleMap
  let map;
  async function initMap() {
    const kirameki = { lat: 35.64373, lng: 139.79450 };
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
    center: kirameki,
    zoom: 14,
  });
}
  initMap();

}