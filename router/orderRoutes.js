const express = require("express");
const { getOrders, makeOrders } = require("../controller/orderController");
const router = express.Router();

router.route("/orders").get(getOrders);
router.route("/newOrder").post(makeOrders);

module.exports = router;
