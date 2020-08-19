import express, { response } from "express";

const app = express();

app.get("/fruits", (request, response) => {
  console.log("Users List");
  response.json(["Apple", "Orange"]);
});

app.listen(3333);
