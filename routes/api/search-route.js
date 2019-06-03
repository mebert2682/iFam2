const router = require("express").Router();
const { getSavedSearches, getSearchById, saveSearch, deleteSearch } = require ("../../controllers/searchController");

router  
  .route("/")
  .get(getSavedSearches)
  .post(saveSearch);


router
  .route("/:id")
  .get(getSearchById)
  .delete(deleteSearch);

module.exports = router;