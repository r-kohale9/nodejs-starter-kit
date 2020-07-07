exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('profile', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('image_url');
        table.string('full_name');
        table.string('date_of_birth');
        table.string('phone');
        table.string('watsapp');
        table.string('details');
        table.timestamps(false, true);
      })
      .createTable('address', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('address_name');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('pin_code');
        table.string('country');
        table.boolean('default').defaultTo(false);
        table.timestamps(false, true);
      })
      .createTable('payment_opt', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('card_number');
        table.string('expiry_date');
        table.string('owner');
        table.boolean('default').defaultTo(false);
        table.timestamps(false, true);
      })
      .createTable('promo_code', table => {
        table.increments();
        table.string('title');
        table.string('image_url');
        table.integer('validity');
        table.string('promo_code');
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('profile'),
    knex.schema.dropTable('address'),
    knex.schema.dropTable('payment_opt'),
    knex.schema.dropTable('order'),
    knex.schema.dropTable('order_detail'),
    knex.schema.dropTable('promo_code')
  ]);
};
