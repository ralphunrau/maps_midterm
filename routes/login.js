const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();


// CREATES COOKIE

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session.userId = req.body.username;
    res.redirect('/profiles');
  });
  return router;
};
