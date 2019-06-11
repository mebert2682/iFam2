const router = require("express").Router();
const searchRoutes = require("./search-route")
const sampleRoutes = require("./samples-route")

router.use("/searches", searchRoutes)
router.use("/samples", sampleRoutes)

module.exports = router;