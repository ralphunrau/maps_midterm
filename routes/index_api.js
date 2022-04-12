
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT *
    FROM maps
    WHERE maps.map_active = true
    ORDER BY map_created_on;`)
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
