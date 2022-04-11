const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.json({ name: "Bob" });
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({users});
      })
      .catch(err => {
        console.log ('err', err.message);
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};