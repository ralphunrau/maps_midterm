
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    db.query('SELECT * FROM maps;')
      .then((data) => {
        const map = data.rows;
        res.json(map);
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
    db.query(`SELECT * FROM
      (SELECT maps.id, maps.user_id, maps.map_title, maps.map_lat, maps.map_lng, maps.map_active, maps.map_description, maps.map_pic_url,
      maps.map_zoom, maps.map_created_on, points.map_id, points.point_active, points.point_created_on, points.point_description,
      points.point_lat, points.point_lng, points.point_title, points.point_url
        FROM maps
        LEFT OUTER JOIN points ON maps.id = points.map_id) AS sub WHERE sub.id = $1 AND sub.map_active = true AND sub.point_active IS NOT false;`, [mapID])
      .then(data => {
        console.log(data.rows);
        const map = data.rows;
        res.json(map);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }

  );
  return router;
};
