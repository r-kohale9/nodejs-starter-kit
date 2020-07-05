import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['address', 'payment_opt']);

  await Promise.all(
    [...Array(2).keys()].map(async () => {
      await returnId(knex('address')).insert({
        address_name: 'katrina',
        address: '22nd Cross Rd Sector 2 HSR Layout',
        city: 'Bengaluru',
        state: 'Karnataka',
        pin_code: '560102',
        country: 'India'
      });
      await returnId(knex('payment_opt')).insert({
        card_number: '4111 1111 1111 1111',
        expiry_date: '10/17',
        owner: 'Jane Doe'
      });
    })
  );
};
