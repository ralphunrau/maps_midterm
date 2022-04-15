const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // RETURNS TABLE WITH A SINGLE ROW OF ID IN URL
  router.get("/:id", (req, res) => {

    const mapID = req.params.id;

    db.query(`SELECT * FROM points
    WHERE map_id = $1
    AND point_active = true;`,
    [mapID])
      .then(data => {
        const map = data.rows;
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
