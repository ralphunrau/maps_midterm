// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const mapsRoutes = require("./routes/maps.js");
const profileRoutes = require("./routes/profiles.js");
const favouritesRoutes = require("./routes/favourites.js");
const mapApiRoutes = require("./routes/map_api.js");
const indexApiRoutes = require("./routes/index_api.js");
const profileApiRoutes = require("./routes/profile_api.js");
const favesApiRoutes = require("./routes/faves_api.js");
const pointApiRoutes = require("./routes/points_api.js");
const loginRoute = require("./routes/login.js");
const logoutRoute = require("./routes/logout.js");

// Mount all resource routes
app.use("/maps", mapsRoutes(db));
app.use("/profiles", profileRoutes(db));
app.use("/faves", favouritesRoutes(db));
app.use("/api/maps", mapApiRoutes(db));
app.use("/api/points", pointApiRoutes(db));
app.use("/api/index", indexApiRoutes(db));
app.use("/api/profile", profileApiRoutes(db));
app.use("/api/faves", favesApiRoutes(db));
app.use("/login", loginRoute(db));
app.use("/logout", logoutRoute(db));

// Home page
app.get("/", (req, res) => {
  const userId = req.session.user_id;
  res.render("index", {userId});
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
