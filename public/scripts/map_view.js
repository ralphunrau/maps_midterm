$(document).ready(function () {

  // GET POINTS FOR CORRESPONDING MAPS
  $.get(`/api/maps/${id}`)
    .then(data => {

      // INITIALIZE THE LATITUDE AND LONGITUDE POINTS
      const lat = data[0].map_lat;
      const lng = data[0].map_lng;
      const markers = [];

      // INITIALIZE THE MAP AND RENDERS THE TEXTURES
      $('#mapTitle').html(data[0].map_title);
      const map = L.map('map').setView([lat, lng], 13);
      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

      // DISPLAYS THE POINTS ON THE CURRENT MAP
      for (const point of data) {

        const lat = point.point_lat;
        const lng = point.point_lng;

        //ADDS POINT TO MAP
        L.marker([lng, lat]).addTo(map)
          .bindPopup(`${point.point_title}<br>${point.point_description}
          <br><img src="${point.point_url} width="100" height="100"">`)
          .openPopup();

        markers.push([lng, lat]);
      }

      map.fitBounds(markers);
      const popup = L.popup();

      // WHEN USER SELECTS A POINT ON A MAP
      const onMapClick = (e) => {

        L.marker([e.latlng.lat, e.latlng.lng])
        popup
          .setLatLng(e.latlng)
          .setContent(`You clicked the map at ${e.latlng.lat}, ${e.latlng.lng}. Give this point some information:`)
          .openOn(map)

        const popupForm = $(`
          <form class ='pointCreationForm' action='/maps/add/${e.latlng.lng}/${e.latlng.lat}/${data[0].map_id}' method='POST'>
            <div><textarea name='title' placeholder ='Enter a title:' style='height: 20px;'></textarea></div>
            <div><textarea name='description' placeholder ='Enter a description:' style='height: 40px;'></textarea></div>
            <div><textarea name='image' placeholder ='Enter a image url:' style='height: 20px;'></textarea></div>
            <button class='submit'>Submit</button>
          </form>
        `);

        $('.leaflet-popup-content').append(popupForm);
      };

      map.on('click', onMapClick);
    });

  // GET A SPECIFIC POINT BY ID
  $.get(`/api/points/${id}`)
    .then(points => {
      for (const point of points) {

        const div = $("<div class='container'></div");
        $(".points_right").append(div);

        //CREATE POINTS SIDEBAR ON MAP PAGE
        const divContent = `
        <div class='pointContainer'>
          <h3>${point.point_title} </h3>
          <div class='buttons'>
            <button class='editButton${point.id}'> Edit </button>
            <form action='/maps/${id}/${point.point_title}/delete' method="GET">
              <button>Delete</button>
            </form>
          </div>
        </div>

        <div class='editForm' id='editForm${point.id}'>
          <div class='title_x'>
            <h4>Edit Form</h4>
            </div>
          <form class='inputsContainer' method="POST" action="/maps/${point.map_id}/${point.id}/edit">
            <button class='closeButton' id='closeButton${point.id}' type="reset"> CLOSE AND RESET </button>
            <textarea class='text' name=title placeholder ='Title: ${point.point_title}' style='height: 40px;'></textarea>
            <textarea class='text' name=descr placeholder ='Description: ${point.point_description}' style='height: 40px;'></textarea>
            <textarea class='text' name=url placeholder ='URL: ${point.point_url}' style='height: 40px;'></textarea>
            <button type="submit"> Submit </button>
          </form>
        </div>
        `;

        div.append(divContent);

        //REVEALS EDIT CLOSES EDIT FORM
        $(`#editForm${point.id}`).hide();

        $(`.editButton${point.id}`).on('click', () => {
          $(`#editForm${point.id}`).slideDown();
        });

        $(`#closeButton${point.id}`).on('click', () => {
          $(`#editForm${point.id}`).slideUp();
        });
      }
    });

});
