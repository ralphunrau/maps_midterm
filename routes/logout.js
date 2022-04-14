const express = require('express');
const router = express.Router();

// DELETES COOKIE

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/maps");
  });
  return router;
};
