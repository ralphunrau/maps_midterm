// Client facing scripts here




$(document).ready(function () {

  //test code
  const oj = {
    lng: 49.1535231,
    lat: -123.1354653
  };

  const path = window.location.pathname;
  const mapID = path.slice(-1);//maybe add if statement with default if not num

  $.ajax({
    type: "GET",
    url: `/maps/${mapID}`,
  }).then((data) => {
    console.log("this is from app.js",data);
  });


  // This is what shows the road layer on the map

  const map = L.map('map').setView([oj.lng, oj.lat], 13);
  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);


  L.marker([oj.long, oj.lat]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  map.on('click', onMapClick);

});
