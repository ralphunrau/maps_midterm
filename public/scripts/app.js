// Client facing scripts here
(() => {

  // $("NAME OF SLIDE OUT").hide();
  // This will render the map
  // .setView should have details provided by user - will have to update schema ([map center lat/lng], zoom)

  const theMap = $('.map');
  const userMap = L.map(theMap).setView([51.505, -0.09], 13);

  // This is what shows the road layer on the map

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoibmNtYWNsZWFuIiwiYSI6ImNsMXNpZTBkYzFvcXAzY21vdXZ6ZWNsdzMifQ.D-DWoaBxQjo5fNBZakdJsw}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmNtYWNsZWFuIiwiYSI6ImNsMXNpZTBkYzFvcXAzY21vdXZ6ZWNsdzMifQ.D-DWoaBxQjo5fNBZakdJsw'
}).addTo(userMap);

  // This should add a marker - make into function that takes in points table data

  L.marker([51.5, -0.09]).addTo(userMap);

  // const makeMarker = () =>{
  //   const pointLatLng = //latlng info
  //   const pointTitle = //title info
  //   L.marker([pointLatLng]).addTo(userMap);
  //   marker.bindPopup(`${pointTitle}`).openPopup();
  //   marker.addEventListener()
  //   $("NAME OF SLIDE OUT").show();
  // }
});
