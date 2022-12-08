const orderModel = require("../model/orderModel");
const { recivedOrder, notifyAdmin } = require("../email/email");

const getOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find();
    res.status(200).json({
      message: "Data Gotten",
      data: allOrders,
    });
  } catch (error) {
    res.status(400).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

const makeOrders = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNo,
      address,
      pickUp,
      delivery,
      description,
      instruction,
    } = req.body;
    const newOrders = await orderModel.create({
      name,
      email,
      mobileNo,
      address,
      pickUp,
      delivery,
      description,
      instruction,
    });

    recivedOrder(
      email,
      name,
      mobileNo,
      address,
      pickUp,
      delivery,
      description,
      instruction
    )
      .then((result) => {
        console.log("User Mail Sent", result);
      })
      .catch((error) => {
        console.log("User: An Error Occoured", error);
      });

    notifyAdmin(
      email,
      name,
      mobileNo,
      address,
      pickUp,
      delivery,
      description,
      instruction
    )
      .then((result) => {
        console.log("Admin Mail Sent", result);
      })
      .catch((error) => {
        console.log("Admin: An Error Occoured", error);
      });
    res.status(400).json({
      message: "Order Sent",
      data: newOrders,
    });
  } catch (error) {
    res.status(400).json({
      message: "An Error Occoured",
      data: error.message,
    });
  }
};

module.exports = { getOrders, makeOrders };
