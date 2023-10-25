const mongoose = require("mongoose");

const docketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  hoursWorked: { type: Number, required: true },
  ratePerHour: { type: Number, required: true },
  supplier: { type: String, required: true },
  purchaseOrder: { type: String, required: true },
});

module.exports = new mongoose.model("docket", docketSchema);
