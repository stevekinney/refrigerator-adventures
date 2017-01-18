exports.up = (knex, Promise) => {
  return knex.schema.createTable('Food', (t) => {
    t.increments('id').primary();
    t.string('name', 100);
    t.integer('quantity');
    t.text('notes');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Food');
};
