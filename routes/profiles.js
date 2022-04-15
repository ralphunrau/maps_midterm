const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //RENDERS ALL OF A USERS MAPS
  router.get("/", (req, res) => {
    const userId = req.session.userId;

    res.render('profile', {userId});
  });

  return router;
};
