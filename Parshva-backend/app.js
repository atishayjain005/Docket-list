const express = require("express");
const cors = require("cors"); 
const app = express();
const docketRoute = require("./routes/docketRoute");
require("./connection/connection");

app.use(cors());
app.use(express.json());
app.use("/api/dockets", docketRoute);

app.listen(1000, () => {
  console.log("server started successfully");
});
