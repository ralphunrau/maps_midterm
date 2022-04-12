const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    res.render('profile', {id});
  });
  return router;
};
