const express = require("express");
const router = express.Router();
const controller = require("./order.controller");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

router.post("/", auth, controller.createOrder);
router.get("/", auth, role("admin"), controller.getOrders);
router.get("/:id", auth, role("admin"), controller.getOrderById);
router.get("/detail/:id", auth, role("admin"), controller.getOrderDetail);
router.post("/cancel/:id", auth, role("admin"), controller.cancelOrder);

module.exports = router;
