const router = require("express").Router();
const { getSavedSearches, getSearchById, saveSearch, deleteSearch } = require ("../../controllers/searchController");

router  
  .router("/")
  .get(getSavedSearches)
  .post(saveSearch);


router
  .router("/:id")
  .get(getSearchById)
  .delete(deleteSearch);

module.exports = router;