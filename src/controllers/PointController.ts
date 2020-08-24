import knex from "../database/conection";
import { Request, Response } from "express";

class PointController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("point")
      .join("point_item", "point.id", "=", "point_item.point_id")
      .whereIn("point_item.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("point.*");
    return response.json({ points });
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("point").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not Found." });
    }

    const items = await knex("item")
      .join("point_item", "item.id", "=", "point_item.item_id")
      .where("point_item.point_id", id)
      .select("item.title");

    return response.json({ point, items });
  }
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const trx = await knex.transaction();

    const idCreatedPoint = await trx("point").insert(point);

    const point_id = idCreatedPoint[0];
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_item").insert(pointItems);

    await trx.commit();

    return response.json({ id: point_id, ...point });
  }
}

export default PointController;
