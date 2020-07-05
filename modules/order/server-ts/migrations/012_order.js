import { STALE } from '../constants/order_states';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      // .createTable('order', table => {
      //   table.increments('id');
      //   table
      //     .integer('consumer_id')
      //     .unsigned()
      //     .references('id')
      //     .inTable('user')
      //     .onDelete('CASCADE');
      //   table
      //     .integer('vendor_id')
      //     .unsigned()
      //     .references('id')
      //     .inTable('user')
      //     .onDelete('CASCADE');
      //   table.string('state').defaultTo(STALE);
      //   table.timestamps(false, true);
      // }),

      // // Order Details
      // knex.schema.createTable('order_detail', table => {
      //   table.increments('id');

      //   table.integer('cost');
      //   table.integer('quantity');

      //   table.string('title');
      //   table.string('thumbnail');
      //   table.string('date');
      //   table.string('note_from_customer');
      //   table.string('additional_customization');

      //   table
      //     .integer('order_id')
      //     .unsigned()
      //     .references('id')
      //     .inTable('order')
      //     .onDelete('CASCADE');
      //   table.timestamps(false, true);
      // }),

      // Order Delivery Table

      .createTable('order', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('tracking_number');
        table
          .integer('payment_method_id')
          .unsigned()
          .references('id')
          .inTable('payment_opt')
          .onDelete('CASCADE');
        table
          .integer('shipping_address_id')
          .unsigned()
          .references('id')
          .inTable('address')
          .onDelete('CASCADE');
        table.string('status').defaultTo(STALE);
        table.string('delivery_method');
        table.string('discount');
        table.timestamps(false, true);
      })
      .createTable('order_detail', table => {
        table.increments();
        table
          .integer('order_id')
          .unsigned()
          .references('id')
          .inTable('order')
          .onDelete('CASCADE');
        table.string('weight');
        table.string('unit');
        table
          .integer('listing_id')
          .unsigned()
          .references('id')
          .inTable('listing')
          .onDelete('CASCADE');
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('order_detail'), knex.schema.dropTable('order')]);
};
