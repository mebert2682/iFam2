const { Search } = require("../models");

function getAllSearches(req, res) {
  Search
    .find({})
    .then(dbSearchData => res.status(200).json(dbSearchData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

function getSearchById(req, res) {
  Search
    .findById(req.params.id)
    .then(dbSearchData => res.status(200).json(dbSearchData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

function saveSearch(req, res) {
  Search
    .create(req.body)
    .then(dbSearchData => res.status(200).json(dbSearchData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

function deleteSearch(req, res) {
  Search.remove({
    _id: req.params.id
  })
    .then(dbSearchData => res.status(200).json(dbSearchData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = {
  getAllSearches,
  getSearchById,
  saveSearch,
  deleteSearch
}

