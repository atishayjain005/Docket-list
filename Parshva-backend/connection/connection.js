const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://atishay005:atishay0005@cluster0.6ntiosd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => console.log("Connected"));
