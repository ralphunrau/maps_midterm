
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // .addClass("content");
  // const item = $("article").addClass("content");

  // RETURNS TABLE OF ALL MAPS
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    res.render('index', { userId });
  });

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/create", (req, res) => {
    const userId = req.session.userId;
    res.render('map_create', { userId });
  });

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.session.userId;
    res.render('map_view', { id, userId });
  });

  //Updates points table with new point
  router.post("/add/:lat/:lng/:id", (req, res) => {
    const userId = req.session.userId;
    let id = req.params.id;
    let lat = req.params.lat;
    let lng = req.params.lng;
    let title = req.body.title;
    let description = req.body.description;
    let image = req.body.image;

    db.query('SELECT user_id FROM maps WHERE maps.id = $1', [req.params.id])
      .then((data) => {
        if ((data.rows[0].user_id) !== userId) {
          console.log(">>>>>>>id no match<<<<<<<", data.rows[0].user_id, userId);
          res.render('map_view', { id, userId });
          return;
        } else {
          db.query('INSERT INTO points (map_id,point_lng, point_lat, point_title, point_description, point_url) VALUES ($1,$2,$3,$4,$5,$6)',
            [id, lng, lat, title, description, image]);
          res.render('map_view', { id, userId });
          console.log("second promise");
        }
      });
  });
  //CREATES NEW MAP
  router.post("/create/:lat/:lng", (req, res) => {
    const userId = req.session.userId;
    const mapTitle = req.body.mapTitle;
    const mapDescription = req.body.mapDescription;
    const mapImage = req.body.mapImage;
    const pointTitle = req.body.pointTitle;
    const pointDescription = req.body.pointDesc;
    const pointImage = req.body.pointImage;
    const lat = req.params.lng;
    const lng = req.params.lat;
    db.query('INSERT INTO maps (user_id, map_lng, map_lat, map_title, map_description, map_pic_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [userId, lng, lat, mapTitle, mapDescription, mapImage])
      .then(data => {
        const id = data.rows[0].id;
        db.query(`INSERT INTO points (map_id,point_lng, point_lat, point_title, point_description, point_url) VALUES ($1, $2, $3, $4, $5, $6)`, [id, lng, lat, pointTitle, pointDescription, pointImage]);
        res.render('map_view', { id, userId });
      });
  });

  //CHANGE POINT TO NOT ACTIVE - TO DELETE FROM MAP
  router.get("/:id/:map_title/delete", (req, res) => {
    const userId = req.session.userId;
    const id = req.params.id;
    const mapTitle = req.params.map_title;
    db.query(`UPDATE points SET point_active = false WHERE point_title = $1`, [mapTitle]);
    res.render('map_view', { id, userId });
  });

  //EDITS SELECTED VALUES IN ROW ON POINT TABLE
  router.post("/:id/:point/edit", (req, res) => {
    const id = req.params.id;
    const pointId = req.params.point;
    const queryParams = [];
    let queryString = `UPDATE points SET `;

    if (req.body.title) {
      queryParams.push(req.body.title);
      queryString += `point_title = $${queryParams.length}, `;
    }

    if (req.body.descr) {
      queryParams.push(req.body.descr);
      queryString += `point_description = $${queryParams.length}, `;
    }

    if (req.body.url) {
      queryParams.push(req.body.url);
      queryString += `point_url = $${queryParams.length} `;
    }
    queryString += (`WHERE id = ${pointId} RETURNING *;`);
    console.log("query string", queryString);
    console.log("query string", queryParams);
    db.query(queryString, queryParams)
      .then(data => {
        const userId = req.session.userId;
        const maps = data.rows;
        res.render("map_view", { id, userId });
      })
      .catch(err => {
        console.log("error in catch");
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/add/:lat/:lng", (req, res) => {
    console.log(req.params.lat, req.params.lng, req.body);
    res.render();
  });



  return router;
};
