import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['address', 'payment_opt']);

  await Promise.all(
    [...Array(2).keys()].map(async i => {
      await Promise.all(
        [...Array(2).keys()].map(async () => {
          await returnId(knex('address')).insert({
            user_id: i + 1,
            address_name: 'katrina',
            address: '22nd Cross Rd Sector 2 HSR Layout',
            city: 'Bengaluru',
            state: 'Karnataka',
            pin_code: '560102',
            country: 'India'
          });
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
    ),
    await Promise.all(
      [...Array(100).keys()].map(async () => {
        const review = await returnId(knex('review')).insert({
          user_id: Math.floor(Math.random() * 2) + 1,
          listing_id: Math.floor(Math.random() * 50) + 1,
          review:
            'Fresh and delicious cake with on time service deliver. I had ordered "Death by chocolate" cake online sitting in Mumbai for my boyfriends birthday cheer, who is based in Bangalore. Initially I was skeptical if I had taken the right decision as I was clueless about the service. But later after placing the orders I saw the reviews and was very positive. I am happy with the commitment.',
          rating: (Math.random() * (10.0 - 1.0 + 1.0) + 1.0).toFixed(1)
        });
        await Promise.all(
          [...Array(3).keys()].map(async () => {
            return returnId(knex('review_image')).insert({
              review_id: review[0],
              image_url:
                'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1593955501/at2lzmozbojuhbpcqc4y.png'
            });
          })
        );
      })
    )
  );
};
