exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl.text("Vin", 128)
      .unique()
      .notNullable();
    tbl.text("Make").notNullable();
    tbl.text("Model").notNullable();
    tbl.integer("Mileage").notNullable();
    tbl.text("TransmissionType");
    tbl.text("TitleStatus");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
