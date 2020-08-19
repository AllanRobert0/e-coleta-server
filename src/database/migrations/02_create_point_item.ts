import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("point_item", (table) => {
    table.increments("id").primary;
    table.integer("point_id").notNullable().references("id").inTable("point");
    table.integer("item_id").notNullable().references("id").inTable("item");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("point_item");
}
