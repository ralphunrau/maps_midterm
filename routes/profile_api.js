
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.session);
    const id = req.session.userId;
    console.log(id);
    db.query(`SELECT *
    FROM maps
    WHERE maps.map_active = true
    AND maps.user_id = $1
    ORDER BY map_created_on;`, [id])
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
