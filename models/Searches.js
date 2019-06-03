const mongoose = require('mongoose');

const { Schema } = mongoose;

const SearchSchema = new Schema ({
  search: {
    type: String,
    required: true
  },

});

const Search = mongoose.model("search", SearchSchema);

module.exports = Search;