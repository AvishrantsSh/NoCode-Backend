const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");

require("dotenv/config");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    const app = express();

    // Configuration
    app.use(express.json());
    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
