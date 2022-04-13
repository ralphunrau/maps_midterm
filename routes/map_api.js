
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
<<<<<<< HEAD
    if (req.params.id > 6) {
      db.query(`SELECT * FROM maps WHERE maps.id = $1`, [mapID])
      .then (data => {
        const map = data.rows;
        res.json(map);
      })
    } else {
      db.query(`SELECT *
      FROM maps
      JOIN points
      ON maps.id = points.map_id
      WHERE maps.id = $1
      AND maps.map_active = true
      AND points.point_active = true
      ORDER BY map_created_on;`, [mapID])
=======
    console.log("this should be 5:", mapID);
    db.query(`SELECT *
    FROM maps
    JOIN points
    ON maps.id = points.map_id
    WHERE maps.id = $1
    AND maps.map_active = true
    AND points.point_active = true
    ORDER BY map_created_on;`, [mapID])
>>>>>>> 2a8c5ea255eb024d7f0e184ed01d418d8fea7819
      .then(data => {
        const map = data.rows;
        res.json(map);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }

  });
  return router;
};
