const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();


// CREATES COOKIE

module.exports = (db) => {
  router.post("/", (req, res) => {
<<<<<<< HEAD
    req.session.user_id = req.body.id;
=======
    req.session.userId = req.body.username;
>>>>>>> master
    res.redirect('/profiles');
  });
  return router;
};
