const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    db.query(`SELECT * FROM maps WHERE active = true AND user_id = $1 ORDER BY created_on;`, [userID])
      .then(data => {
        const users = data.rows;
        res.json({users});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
