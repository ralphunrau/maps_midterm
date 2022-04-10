const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    db.query(`SELECT * FROM maps JOIN favourites ON maps.id = favourites.map_id JOIN users ON users.id = favourites.user_id WHERE favourites.active = true AND favourites.user_id = $1 ORDER BY favourites.created_on;`, [userID])
      .then(data => {
        const users = data.rows;
        res.json({users});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
