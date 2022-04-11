$(document).ready(function () {
  $.get(`/api/maps/${id}`)
  .then (data => {
    // console.log (data)
    $('#mapTitle').html(data.title);  
    const map = L.map('map').setView([data.lng, data.lat], 13);
    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

    L.marker([data.lng, data.lat]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    const popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }
  });
});
