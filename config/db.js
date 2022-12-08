const mongoose = require("mongoose");

const URI = "mongodb://localhost/laundryOrders";
mongoose
  .connect(URI)
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((error) => {
    console.log("Could'nt Connect to DB");
  });
