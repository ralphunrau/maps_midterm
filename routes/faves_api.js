const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // GET DATA ABOUT CURRENT USER FAVES
  router.get("/", (req, res) => {

    const id = req.session.userId;

    db.query(`SELECT maps.* FROM maps
    JOIN favourites ON maps.id = favourites.map_id
    JOIN users ON users.id = favourites.user_id
    WHERE favourites.fav_active = true
    AND favourites.user_id = $1
    ORDER BY favourites.fav_created_on;`, [id])
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
