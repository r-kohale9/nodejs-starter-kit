exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('review', table => {
        table.increments();
        table
          .integer('baker_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.string('feedback');
        table.integer('rating');
        table.timestamps(false, true);
      })
      .createTable('review_image', table => {
        table.increments();
        table
          .integer('review_id')
          .unsigned()
          .references('id')
          .inTable('review')
          .onDelete('CASCADE');
        table.string('image_url');
        table.timestamps(false, true);
      })
      .createTable('rating', table => {
        table.increments();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.integer('one').defaultTo(0);
        table.integer('two').defaultTo(0);
        table.integer('three').defaultTo(0);
        table.integer('four').defaultTo(0);
        table.integer('five').defaultTo(0);
        table.timestamps(false, true);
      })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('reviews'), knex.schema.dropTable('review_image')]);
};
