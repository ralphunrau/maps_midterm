// // Client facing scripts here

// // const { Pool } = require('pg');

// // const pool = new Pool ({
// //   user: 'vagrant',
// //   password: '123',
// //   host: 'localhost',
// //   database: 'midterm'
// // })


// // const getCoords = require('functions.js');

// $(document).ready(function () {
//   $('#test').on('click', onButtonClick)

//   map.on('click', onMapClick);
// });

// const onButtonClick = () => {
//   console.log('click');
//   $.get('/api/test')
//   .then (data => {
//     console.log (data)
//   })
// }

//   $.get(`api/maps/${mapID}`})
//   .then((data) => {
//     console.log("this is from app.js",data);
//   });

//   //test code
// // const getCoords = function (mapID) {
// //     console.log('inside function')
// //   return pool
// //   .query(`SELECT * FROM maps WHERE active = true AND id = $1 ORDER BY created_on;`, [mapID])
// //   .then(data => {
// //     console.log('inside promise')
// //     const obj = data.rows[0];
// //     const templateVars = {
// //       title: obj.title,
// //       lat: obj.lat,
// //       lng: obj.lng,
// //       zoom: obj.zoom
// //     };
// //     return templateVars;
// //   })
// //   .catch(err => {
// //     console.log(err);
// //     return err;
// //   });
// // }

// // console.log('lng', getCoords(1), 'lat', getCoords(1))
// // console.log('function', getCoords(1));

//   // const oj = {
//   //   lng: 49.1535231,
//   //   lat: -123.1354653
//   // };

//   //  const oj = {
//   //   lng: getCoords(1).lng,
//   //   lat: -123.1354653
//   // };

//   // const path = window.location.pathname;
//   // const mapID = path.slice(-1);//maybe add if statement with default if not num


//   // This is what shows the road layer on the map

//   // const map = L.map('map').setView([oj.lng, oj.lat], 13);
//   // L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);


//   // L.marker([oj.long, oj.lat]).addTo(map)
//   //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//   //   .openPopup();

//   // const popup = L.popup();

//   // function onMapClick(e) {
//   //   popup
//   //     .setLatLng(e.latlng)
//   //     .setContent("You clicked the map at " + e.latlng.toString())
//   //     .openOn(map);
//   // }


// // });
