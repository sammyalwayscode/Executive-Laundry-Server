const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  address: {
    type: String,
  },
  pickUp: {
    type: String,
  },
  delivery: {
    type: String,
  },
  description: {
    type: String,
  },
  instruction: {
    type: String,
  },
});

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
