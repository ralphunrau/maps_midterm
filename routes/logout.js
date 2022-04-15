const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // DELETES COOKIE
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/maps");
  });

  return router;
};
