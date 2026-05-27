const express = require("express");

const route = express.Router();

const controller = require("./user.controller");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

route.get("/", auth, role("admin"), controller.getUsers);

route.post("/", auth, role("admin"), controller.createUser);

route.patch("/:id/toggle", auth, role("admin"), controller.toggleUser);

module.exports = route;
