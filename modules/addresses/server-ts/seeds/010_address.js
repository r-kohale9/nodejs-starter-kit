import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['user_address']);

  await Promise.all(
    [...Array(2).keys()].map(async i => {
      await Promise.all(
        [...Array(2).keys()].map(async () => {
          await returnId(knex('user_address')).insert({
            user_id: i + 1,
            address_name: 'katrina',
            shipping_address: '22nd Cross Rd Sector 2 HSR Layout',
            city: 'Bengaluru',
            state: 'Karnataka',
            pin_code: '560102',
            country: 'India'
          });
        })
      );
    })
  );
};
