import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['payment_opt']);

  await Promise.all(
    [...Array(2).keys()].map(async i => {
      await Promise.all(
        [...Array(2).keys()].map(async () => {
          await returnId(knex('payment_opt')).insert({
            user_id: i + 1,
            card_number: '4111 1111 1111 1111',
            expiry_date: '10/17',
            owner: 'Jane Doe'
          });
        })
      );
    }),
    await Promise.all(
      [...Array(15).keys()].map(async () => {
        await returnId(knex('promo_code')).insert({
          title: Math.random() < 0.6 ? 'Personal offer' : 'Mealting summer',
          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1593955501/at2lzmozbojuhbpcqc4y.png',
          validity: Math.floor(Math.random() * 50) + 1,
          promo_code: Math.random()
            .toString(36)
            .substring(3)
            .toUpperCase()
        });
      })
    )
  );
};
