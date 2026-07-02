import express from "express";
import { createFood, deleteFoods, editFoods, getFoods } from "../controllers/food.controller.js"
import upload from "../middlewares/upload.middleware.js";
import {isAdmin, verifyToken} from "../middlewares/auth.middlewares.js"

const foodRoutes = express.Router();

foodRoutes.route("/create").post(verifyToken, isAdmin, upload.single("photo"), (createFood));
//in schema of food data modeling we've to pass photo as well.
//a photo is a file and can't be passed via json 
// to pass a file, we use form data format in postman, it has got key value pair structure

foodRoutes.route("/").get(getFoods);
foodRoutes.route("/:id").delete(verifyToken,isAdmin,deleteFoods);
foodRoutes.route("/:id").patch(verifyToken,isAdmin, upload.single('photo'), editFoods);


export default foodRoutes;


