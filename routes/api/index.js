const router = require("express").Router();
const searchRoutes = require("./search-route")

router.use("/searches", searchRoutes)

module.exports = router;