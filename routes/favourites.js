const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    res.render('faves', { userId });
  });

  router.post("/:id", (req, res) => {
    const userId = req.session.userId;

    db.query(`INSERT INTO favourites (user_id, map_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [userId, req.params.id]);

    res.render('faves', { userId });
  });
  return router;
};
