const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // CREATES COOKIE
  router.post("/", (req, res) => {
    req.session.userId = req.body.username;
    res.redirect('/profiles');
  });

  return router;
};
