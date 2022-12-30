const express = require("express");
const cors = require("cors");
const PORT = 4032;
const app = express();
const orderRoute = require("../router/orderRoutes");
app.use(express.json());
app.use(cors({ origin: "*" }));
require("../config/db");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server Up 🚀🚀🚀",
  });
});

app.get("/home", (req, res) => {
  res.render("mail");
});

app.use("/api", orderRoute);

app.listen(PORT, () => {
  console.log(`Server Listening To PORT: ${PORT}`);
});
