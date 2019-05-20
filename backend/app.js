const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

const app = express();

function getConnection() {
  const argv = require('yargs').argv;
  switch (argv.env) {
    case 'prd':
      return new Promise(resolve => resolve(`mongodb://mean:${process.env.MONGO_PW}@${process.env.MONGO_URL}/mean`));
    case 'embedded': {
      const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
      return new MongoMemoryServer().getConnectionString();
    }
    case 'dev':
    default:
      return new Promise(resolve => resolve(`mongodb://localhost:27017/mean`));
  }
}

getConnection().then(connection =>
mongoose
  .connect(connection, {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => {
    console.log(e);
    console.log("Connection failed!");
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
