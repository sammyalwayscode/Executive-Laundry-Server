const express = require("express");
const path = require("path");
const PORT = 4032;
const app = express();
const router = express.Router();
const orderRoute = require("../router/orderRoutes");
app.use(express.json());
require("../config/db");

app.set("view engine", "ejs");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/html/index.html"));
});

app.get("/home", (req, res) => {
  res.render("mail");
});

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Server Up",
//   });
// });

// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/html/err.html"));
// });

app.use("/", router);
app.use("/api", orderRoute);

app.listen(PORT, () => {
  console.log(`Server Listening To PORT: ${PORT}`);
});
