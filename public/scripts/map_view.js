$(document).ready(function () {
  // let map_id = '';

  $.get(`/api/maps/${id}`)
    .then(data => {

      // console.log('data', data[0]);
      const maplat = "-123.127576";
      const maplng = "49.28249";
      $('#mapTitle').html(data[0].map_title);
      const map = L.map('map').setView([data[0].map_lat, data[0].map_lng], 13);
      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

      for (const point of data) {
        if (data.point_lat === null) {
          return;
        }
        let lat = point.point_lat;
        let lng = point.point_lng;
        L.marker([lng, lat]).addTo(map)
          .bindPopup(`${point.point_title}<br>${point.point_description}
          <br><img src="/maps/${point.point_url} width="100" height="100"">
          <form class="edit_form">
          <button type="submit">EDIT</button>
          </form>
          <form class="delete_form" action='/maps/${id}/${point.point_title}/delete' method="GET">
          <button>DELETE</button>
          </form>`)
          .openPopup();
      }
      const popup = L.popup();
      const onMapClick = (e) => {
        L.marker([e.latlng.lat, e.latlng.lng])
          .bindPopup('A point of interest.')
          .openPopup();
        popup
          .setLatLng(e.latlng)
          .setContent(`You clicked the map at ${e.latlng.lat}, ${e.latlng.lng}. Give this point some information:`)
          .openOn(map);
        const popupForm = $(`
          <form class ='pointCreationForm' action='/maps/add/${e.latlng.lng}/${e.latlng.lat}/${data[0].map_id}' method='POST'>
            <div><textarea name='title' placeholder ='Enter a title:' style='height: 20px;'></textarea></div>
            <div><textarea name='description' placeholder ='Enter a description:' style='height: 40px;'></textarea></div>
            <div><textarea name='image' placeholder ='Enter a image url:' style='height: 20px;'></textarea></div>
            <button class='submit'>Sumbit</button>
          </form>
        `);
        $('.leaflet-popup-content').append(popupForm);
      };

      $('.edit_form').on('submit', (e) => {
        e.preventDefault();
        console.log('event:', e);
        // action="/maps/${id}/:${point.point_title}/edit" method="POST"
        const editPopupForm = `
        <form class ='editPointForm'>
          <div><textarea name='title' placeholder ='Enter a new title:' style='height: 20px;'></textarea></div>
          <div><textarea name='description' placeholder ='Enter a new description:' style='height: 40px;'></textarea></div>
          <div><textarea name='image' placeholder ='Enter a new image url:' style='height: 20px;'></textarea></div>
          <button class='submit'>Sumbit</button>
        </form>`;

        $('.edit_form').remove();
        $('.delete_form').remove();
        $('.leaflet-popup-content').append(editPopupForm);
      });

      map.on('click', onMapClick);
    });

    $.get('/api/maps')
    .then(maps => {
      for (const map of maps) {
        const mapsItem = function (map) {
          const division = $("<div></div");
          $(".maps_right").append(division);
          const itemContent = `
          <a href="/maps/${map.id}">
          <h2>${map.map_title}</h2>
          </a>
          `
          const newMap = division.append(itemContent);
          return newMap;
        }
        mapsItem(map);
      }
    })

    // $('.fav_button').click(function () {

    // })

});
