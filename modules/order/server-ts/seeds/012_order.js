import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { WEIGHTS } from '@gqlapp/demo-client-react/containers/Constants';
import STATES from '../constants/order_states';

// exports.seed = async function(knex) {
//   await truncateTables(knex, Promise, ['order', 'order_detail']);
//   // Orders for Admin

//   // Order STALE
//   // Table: order
//   const order_stale = await returnId(knex('order')).insert({
//     consumer_id: 1,
//     vendor_id: 1,
//     state: STATES.STALE
//   });

//   // 2 items in cart
//   await Promise.all(
//     [...Array(1).keys()].map(async i => {
//       // Table: order_detail
//       await returnId(knex('order_detail')).insert({
//         order_id: order_stale[0],
//         cost: 1234,
//         quantity: 5,
//         title: 'some listing',
//         thumbnail:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU',
//         date: '14 march',
//         note_from_customer: 'some note',
//         additional_customization: 'something custom'
//       });
//     })
//   );

//   // Order INITIATED
//   // Table: order
//   const order_initiated = await returnId(knex('order')).insert({
//     consumer_id: 1,
//     vendor_id: 1,
//     state: STATES.INITIATED
//   });

//   // 2 items in INITIATED
//   await Promise.all(
//     [...Array(4).keys()].map(async i => {
//       // Table: order_detail
//       await returnId(knex('order_detail')).insert({
//         order_id: order_initiated[0],
//         cost: 1234,
//         quantity: 5,
//         title: 'some listing',
//         thumbnail:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU',
//         date: '14 march'
//       });
//     })
//   );
// };

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['order', 'order_detail']);

  // Table: order
  await Promise.all(
    [...Array(50).keys()].map(async () => {
      const order = await returnId(knex('order')).insert({
        user_id: Math.floor(Math.random() * 2) + 1,
        tracking_number: Math.random()
          .toString(36)
          .substring(3)
          .toUpperCase(),
        // payment_method_id: Math.floor(Math.random() * 2) + 1,
        // shipping_address_id: Math.floor(Math.random() * 2) + 1,
        status: STATES.STATESARRAY[Math.floor(Math.random() * STATES.STATESARRAY.length)],
        delivery_method: STATES.DELIVERY[Math.floor(Math.random() * STATES.DELIVERY.length)],
        discount: '10% personal promo code'
      });
      await Promise.all(
        [...Array(Math.floor(Math.random() * 4) + 1).keys()].map(async () => {
          return returnId(knex('order_detail')).insert({
            order_id: order[0],
            listing_id: Math.floor(Math.random() * 50) + 1,
            weight: WEIGHTS[Math.floor(Math.random() * WEIGHTS.length)],
            unit: Math.floor(Math.random() * 7) + 1
          });
        })
      );
    })
  );
};
