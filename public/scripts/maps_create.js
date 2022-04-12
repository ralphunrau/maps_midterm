
$(document).ready(function() {
  const map = L.map('map').setView([49.286796, -123.129427],60);
  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

  const popup = L.popup();
  function onMapClick(e){
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }
});
