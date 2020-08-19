import express, { response } from "express";

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ mensage: "Home Page" });
});

export default routes;
