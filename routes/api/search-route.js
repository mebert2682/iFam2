const router = require("express").Router();
const { getAllSearches, getSearchById, saveSearch, deleteSearch } = require ("../../controllers/searchController");

router  
  .route("/")
  .get(getAllSearches)
  .post(saveSearch);


router
  .route("/:id")
  .get(getSearchById)
  .delete(deleteSearch);

module.exports = router;