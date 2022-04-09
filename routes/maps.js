
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // RETURNS TABLE OF ALL MAPS
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM maps WHERE active = true ORDER BY created_on;`)
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

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/:id", (req, res) => {
    const mapID = req.params.id;
    db.query(`SELECT * FROM maps WHERE active = true AND id = $1 ORDER BY created_on;`, [mapID])
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

  //EDITS SELECTED VALUES IN ROW ON POINT TABLE
  router.post("/:id/edit", (req, res) => {
    console.log(req.body.id);
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





  return router;
};
