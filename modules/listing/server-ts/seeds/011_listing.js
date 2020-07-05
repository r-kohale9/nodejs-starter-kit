import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { CATEGORY, WEIGHTS } from '@gqlapp/demo-client-react/containers/Constants';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['listing', 'listing_image', 'listing_cost']);

  await Promise.all(
    [...Array(50).keys()].map(async ii => {
      const listing = await returnId(knex('listing')).insert({
        user_id: Math.floor(Math.random() * 2) + 1,
        title: `Listing ${ii + 1}`,
        description: `This is listing ${ii +
          1}. Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.`,
        is_active: Math.random() < 0.6 ? false : true,
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        rating: (Math.random() * (5.0 - 1.0 + 1.0) + 1.0).toFixed(1)
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('listing_image')).insert({
            listing_id: listing[0],
            image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1593961377/wfouh2evldlk2otnxepx.svg'
          });
        })
      );
      await Promise.all(
        [...Array(WEIGHTS.length).keys()].map(async w => {
          await returnId(knex('listing_cost')).insert({
            listing_id: listing[0],
            weight: WEIGHTS[w],
            cost: Math.floor(Math.random() * (999 - 100 + 1) + 100)
          });
        })
      );
      (Math.random() < 0.6 ? false : true) &&
        (await returnId(knex('listing_bookmark')).insert({
          listing_id: listing[0],
          user_id: Math.floor(Math.random() * 2) + 1
        }));
    })
  );
};
