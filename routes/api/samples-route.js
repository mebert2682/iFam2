const router = require('express').Router();

const {scrapeWhoSampled} = require("../../controllers/scrapingController");

// GET route to match '/api/samples'
router
  .route('/')
  .get(scrapeWhoSampled);

module.exports = router;