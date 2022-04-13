const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user_id = req.session.userId;
    res.render('faves', {user_id});
  });

  router.post("/:id", (req, res) => {
    const user_id = req.session.userId;

    db.query (`INSERT INTO favourites (user_id, map_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [user_id,req.params.id])

    res.render('faves', {user_id});
  })
  return router;
};
