exports.up = function(knex) {
  return Promise.all([
    knex.schema
      // .createTable('user_address', (table) => {
      //   table.increments();
      //   table.string('street_address1');
      //   table.string('street_address2');
      //   table.string('city');
      //   table.string('state');
      //   table.string('pin_code');
      //   table
      //     .integer('user_id')
      //     .unsigned()
      //     .references('id')
      //     .inTable('user')
      //     .onDelete('CASCADE');
      //   table.timestamps(false, true);
      // })
      .createTable('user_address', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('address_name');
        table.string('shipping_address');
        table.string('city');
        table.string('state');
        table.string('pin_code');
        table.string('country');
        table.boolean('default').defaultTo(false);
        table.timestamps(false, true);
      })
  ]);
};
exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('user_address')]);
};
