
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // .addClass("content");
  // const item = $("article").addClass("content");

  // RETURNS TABLE OF ALL MAPS
  router.get("/", (req, res) => {
    res.render('index');
  });

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/create", (req, res) => {
    res.render('map_create');
  });

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.render('map_view', {id});
  });

  //Updates points table with new point
  router.post("/add/:lat/:lng/:id", (req, res) => {
    // const id = req.session.userId;
    // console.log(req.params.lat, req.params.lng, req.body, req.params.id);
    // res.render('map_view', {id});
    let lat = req.params.lat;
    let lng = req.params.lng;
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    let image = req.body.image;
    db.query('INSERT INTO points (map_id,point_lng, point_lat, point_title, point_description, point_url) VALUES ($1,$2,$3,$4,$5,$6)',
      [id, lng, lat, title, description, image]);
    res.render('map_view', {id});
  });

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
    db.query('INSERT INTO maps (user_id, map_lng, map_lat, map_title, map_description, map_pic_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[userId, lng, lat, mapTitle, mapDescription, mapImage])
      .then(data=>{
        const id = data.rows[0].id;

        db.query(`INSERT INTO points (map_id,point_lng, point_lat, point_title, point_description, point_url) VALUES ($1, $2, $3, $4, $5, $6)`, [id, lng, lat, pointTitle, pointDescription, pointImage])

        res.render('map_view', {id});
      });
  });
  // DELETE SELECTED POINT FROM MAP

  router.post("/:id/:point_title/delete", (req, res) =>{
    const id = req.params.id;
    const titleId = req.params.point_title;
    db.query(`UPDATE points SET point_active = false WHERE point_title = $1`, [titleId]);
    res.render("map_view", {id});
  });

  //EDITS SELECTED VALUES IN ROW ON POINT TABLE
  router.post("/:id/edit", (req, res) => {
    // console.log(req.body.id);
    const mapID = req.params.id;
    const queryParams = [];
    let queryString = `UPDATE point`;

    if (req.body.lat) {
      queryParams.push(req.body.lat);
      queryString += `SET lat = $${queryParams.length},`;
    }

    if (req.body.lng) {
      queryParams.push(req.body.lng);
      queryString += `SET lng = $${queryParams.length},`;
    }

    if (req.body.title) {
      queryParams.push(req.body.title);
      queryString += `SET title = $${queryParams.length},`;
    }

    if (req.body.description) {
      queryParams.push(req.body.description);
      queryString += `SET description = $${queryParams.length},`;
    }

    if (req.body.point_url) {
      queryParams.push(req.body.point_url);
      queryString += `SET point_url = $${queryParams.length},`;
    }

    queryParams.push(mapID);
    queryString += (`WHERE id = $${queryParams.length} RETURNING *;`);

    db.query(queryString, queryParams)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
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
