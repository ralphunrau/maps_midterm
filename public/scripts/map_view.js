$(document).ready(function () {
  // let map_id = '';

  $.get(`/api/maps/${id}`)
    .then(data => {

      // console.log('data', data[0]);
      // const maplat = "-123.127576";
      // const maplng = "49.28249";
      $('#mapTitle').html(data[0].map_title);
      const map = L.map('map').setView([data[0].map_lat, data[0].map_lng], 10);
      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

      for (const point of data) {
        if (data.point_lat === null) {
          return;
        }
        let lat = point.point_lat;
        let lng = point.point_lng;
        L.marker([lng, lat]).addTo(map)
          .bindPopup(`${point.point_title}<br>${point.point_description}
          <br><img src="${point.point_url} width="100" height="100"">`)
          .openPopup();
      }
      const popup = L.popup();
      const onMapClick = (e) => {
        L.marker([e.latlng.lat, e.latlng.lng]);
        // .openPopup();
        popup
          .setLatLng(e.latlng)
          .setContent(`You clicked the map at ${e.latlng.lat}, ${e.latlng.lng}. Give this point some information:`)
          .openOn(map)
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

  $.get(`/api/points/${id}`)
    .then(points => {
      for (const point of points) {
        console.log(point);
        const div = $("<div class='container'></div");
        $(".points_right").append(div);
        const divContent = `
        <div class='pointContainer'>
          <h5>${point.point_title} </h5>
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
