const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    db.query(`SELECT * FROM maps JOIN users ON maps.user_id = users.id WHERE maps.active = true AND maps.user_id = $1 ORDER BY created_on;`, [userID])
      .then(data => {
        const templateVars = data.rows;
        console.log(data.rows);
        // res.json({users});
        res.render('profile', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
