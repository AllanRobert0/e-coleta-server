import knex from "../database/conection";
import { Request, Response } from "express";
class ItemController {
  async index(request: Request, response: Response) {
    const items = await knex("item").select("*");

    const serializerdItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return response.json({ data: serializerdItems });
  }
}

export default ItemController;
