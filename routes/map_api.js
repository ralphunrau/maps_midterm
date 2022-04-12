
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/:id", (req, res) => {
    const mapID = req.params.id;
    db.query(`SELECT * JOIN points ON maps.id = points.map_id
    WHERE maps.id = $1 AND maps.active = true AND points.active = true ORDER BY maps.created_on;`, [mapID])
      .then(data => {

        const map = data.rows;
        console.log(map);
        res.json(map);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
