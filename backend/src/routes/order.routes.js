import express from "express";
import { createOrder, getOrderById, success } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";

const orderRoutes = express.Router();

orderRoutes.route("/create").post(verifyToken, createOrder);
orderRoutes.route("/success").get(success);
orderRoutes.route("/:id").get(getOrderById);


export default orderRoutes;


