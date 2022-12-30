const mongoose = require("mongoose");

// const URI = "mongodb://localhost/laundryOrders";
const liveURI =
  "mongodb+srv://Sammy:sammysam@cluster0.aqlrqqw.mongodb.net/Executive_Laundry?retryWrites=true&w=majority";

mongoose
  .connect(liveURI)
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((error) => {
    console.log("Could'nt Connect to DB");
  });
