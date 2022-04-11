
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // RETURNS TABLE WITH SINGLE ROW OF ID IN URL
  router.get("/:id", (req, res) => {
    const mapID = req.params.id;
    db.query(`SELECT * FROM maps WHERE active = true AND id = $1 ORDER BY created_on;`, [mapID])
      .then(data => {
        const map = data.rows[0];
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
