const path = require("path");
const router = require("express").Router();
const userApiRoutes = require("./api/user-routes");
const materialApiRoutes = require("./api/material-routes")

// API Routes
router.use(userApiRoutes);
router.use(materialApiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
