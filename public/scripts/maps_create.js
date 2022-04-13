$(document).ready(function () {
  const map = L.map('map').setView([49.286796, -123.129427], 60);
  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

  const popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(`You clicked the map at ${e.latlng.lat}, ${e.latlng.lng}. Give this point some information:`)
      .openOn(map);
    const popupForm = $(`
    <form class ='pointCreationForm' action='/maps/create/${e.latlng.lat}/${e.latlng.lng}' method='POST'>
      <div><textarea name='title' placeholder ='Enter a title:' style='height: 20px;'></textarea></div>
      <div><textarea name='description' placeholder ='Enter a description:' style='height: 40px;'></textarea></div>
      <div><textarea name='image' placeholder ='Enter a image url:' style='height: 20px;'></textarea></div>
      <button class='submit'>Sumbit</button>
    </form>
  `);
    $('.leaflet-popup-content').append(popupForm)
  }

});
