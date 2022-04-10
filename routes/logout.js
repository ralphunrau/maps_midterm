const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

// DELETES COOKIE

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/maps");
  });
};
