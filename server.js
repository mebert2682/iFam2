const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger("dev"));

const routes = require("./routes");
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ifam2", {
  useNewUrlParser: true
});

mongoose.Promise = Promise;

app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));