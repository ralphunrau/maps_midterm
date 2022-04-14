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
          <br><img src="${point.point_url} width="100" height="100"">
          <form action="/${id}/${point.point_title}/edit" method="POST">
          <button>EDIT</button></form>
          <form action='/maps/${id}/${point.point_title}/delete' method="GET">
          <button>DELETE</button></form>`)
          .openPopup();

          console.log(id,point.point_title);
      }
      const popup = L.popup();

      const onMapClick = (e) => {
        L.marker([e.latlng.lat, e.latlng.lng])
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
      map.on('click', onMapClick);
      // const submitform = $('.pointCreationForm');
      // submitform.submit(function() {
      //   // event.preventDefault();
      //   // L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
      //   //   .bindPopup('A point of interest.')
      //   //   .closePopup();
      //   console.log('23');
      // });
    });

    $.get(`/api/points/${id}`)
    .then(points => {
      for (const point of points) {
        console.log(point)
        const div = $("<div class='container'></div");
        $(".points_right").append(div);
        const divContent = `
        <div class='pointContainer'>
          <h3>${point.point_title} </h3>
          <div class='buttons'>
            <button class='editButton${point.id}'> Edit </button>
            <form action='/maps/${id}/${point.point_title}/delete' method="GET">
              <button>DELETE</button>
            </form>
          </div>
        </div>

        <div class='editForm${point.id}'>
          <div class='title_x'>
            <h4>Edit Form</h4>
            <button class='closeButton${point.id}'> X </button>
          </div>
          <form class='inputsContainer' method="POST" action="${point.map_id}/edit">
            <textarea class='text' name=title placeholder ='Title: ${point.point_title}' style='height: 40px;'></textarea>
            <textarea class='text' name=descr placeholder ='Description: ${point.point_description}' style='height: 40px;'></textarea>
            <textarea class='text' name=url placeholder ='URL: ${point.point_url}' style='height: 40px;'></textarea>
            <button>Submit </button>
          </form>
        </div>
        `;
        div.append(divContent);

        $(`.editForm${point.id}`).hide();

        $(`.editButton${point.id}`).on('click', () => {
          $(`.editForm${point.id}`).slideDown();
        })

        $(`.closeButton${point.id}`).on('click', () => {
          $(`.editForm${point.id}`).slideUp();
        })
      }
    })

});
