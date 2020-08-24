import express, { response } from "express";

import PointController from "./controllers/PointController";
const pointController = new PointController();

import ItemController from "./controllers/ItemController";
const itemController = new ItemController();

const routes = express.Router();

routes.get("/item", itemController.index);

routes.get("/point", pointController.index);
routes.get("/point/:id", pointController.show);
routes.post("/point", pointController.create);

export default routes;
