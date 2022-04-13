$(document).ready(function() {
  const map = L.map('map').setView([49.286796, -123.129427],60);
  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

  const popup = L.popup();
  function onMapClick(e){
    // console.log (e.latlng);
    popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng.lat}, ${e.latlng.lng}. Give this point some information:`)
    .openOn(map);
    const popupForm = $(`
    <form class ='pointCreationForm' action='/maps/create/${e.latlng.lat}/${e.latlng.lng}' method='POST'>
      <div><textarea name='mapTitle' placeholder ='Enter a map title:' style='height: 20px;'></textarea></div>
      <div><textarea name='mapDescription' placeholder ='Enter a map description:' style='height: 40px;'></textarea></div>
      <div><textarea name='mapImage' placeholder ='Enter a map image url:' style='height: 20px;'></textarea></div>
      <div><textarea name='pointTitle' placeholder ='Enter a point title:' style='height: 20px;'></textarea></div>
      <div><textarea name='pointDesc' placeholder ='Enter a point description:' style='height: 20px;'></textarea></div>
      <div><textarea name='pointImage' placeholder ='Enter a point url:' style='height: 20px;'></textarea></div>
      <button class='submit'>Sumbit</button>
    </form>
  `);
  $('.leaflet-popup-content').append(popupForm)
  }
  map.on('click', onMapClick);
});
