$(document).ready(function () {
  $.get(`/api/maps/${id}`)
    .then(data => {
      $('#mapTitle').html(data[0].map_title);
      const map = L.map('map').setView([data[0].map_lng, data[0].map_lat], 13);
      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

      for (const point of data) {
        let lat = point.point_lat;
        let lng = point.point_lng;
        L.marker([lng, lat]).addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();
        }
        const popup = L.popup();
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }
    });
});
