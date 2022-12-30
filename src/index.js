const express = require("express");
const PORT = 4032;
const app = express();
const orderRoute = require("../router/orderRoutes");
app.use(express.json());
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

app.use("/", router);
app.use("/api", orderRoute);

app.listen(PORT, () => {
  console.log(`Server Listening To PORT: ${PORT}`);
});
