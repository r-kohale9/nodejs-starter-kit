import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['review', 'review_image']);

  await Promise.all(
    [...Array(50).keys()].map(async ii => {
      const review = await returnId(knex('review')).insert({
        baker_id: Math.floor(Math.random() * (16 - 2 + 1) + 2),
        user_id: Math.floor(Math.random() * (22 - 17 + 1) + 17),
        feedback: `This is review ${ii +
          1} Fresh and delicious cake with on time service deliver. I had ordered "Death by chocolate" cake online sitting in Mumbai for my boyfriends birthday cheer, who is based in Bangalore. Initially I was skeptical if I had taken the right decision as I was clueless about the service. But later after placing the orders I saw the reviews and was very positive. I am happy with the commitment.`,
        rating: Number((Math.random() * (5.0 - 2.0 + 1.0) + 1.0).toFixed(1))
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('review_image')).insert({
            review_id: review[0],
            image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1593961377/wfouh2evldlk2otnxepx.svg'
          });
        })
      );
    })
  );
  await Promise.all(
    [...Array(15).keys()].map(async ii => {
      return returnId(knex('rating')).insert({
        user_id: ii + 2,
        one: Math.floor(Math.random() * 5) + 1,
        two: Math.floor(Math.random() * 5) + 1,
        three: Math.floor(Math.random() * 5) + 1,
        four: Math.floor(Math.random() * 5) + 1,
        five: Math.floor(Math.random() * 5) + 1
      });
    })
  );
};
