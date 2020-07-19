import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';

Model.knex(knex);

export interface Reviews {
  userId: number;
  bakerId: number;
  feedback: string;
  rating: number;
  listingId: number;
  reviewImages: ReviewImage[];
}
export interface Identifier {
  id: number;
}
const eager = '[review_images, user.[profile], baker.[profile]]';

// Review model.
export default class Review extends Model {
  private id: any;

  static get tableName() {
    return 'review';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'review.user_id',
          to: 'user.id'
        }
      },
      baker: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'review.baker_id',
          to: 'user.id'
        }
      },
      review_images: {
        relation: Model.HasManyRelation,
        modelClass: ReviewImage,
        join: {
          from: 'review.id',
          to: 'review_image.review_id'
        }
      }
    };
  }

  public async allReviewsPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = Review.query()
      .orderBy('id', 'desc')
      .eager(eager);

    // if (orderBy && orderBy.column) {
    //   const column = orderBy.column;
    //   let order = 'asc';
    //   if (orderBy.order) {
    //     order = orderBy.order;
    //   }

    //   queryBuilder.orderBy(decamelize(column), order);
    // } else {
    //   queryBuilder.orderBy('id', 'desc');
    // }

    if (filter) {
      // if (has(filter, 'isActive') && filter.isActive !== '') {
      //   queryBuilder.where(function() {
      //     this.where('is_active', filter.isActive);
      //   });
      // }
      // if (has(filter, 'searchText') && filter.searchText !== '') {
      //   queryBuilder
      //     .from('listing')
      //     .leftJoin('listing_cost AS ld', 'ld.listing_id', 'listing.id')
      //     .where(function() {
      //       this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
      //         .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
      //         .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.cost', `%${filter.searchText}%`]));
      //     });
      // }
    }

    const allReviews = camelizeKeys(await queryBuilder);
    const total = allReviews.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { reviews: res, total };
  }

  public async reviewsPagination(limit: number, after: number, orderBy: any, filter: any, userId: number) {
    const queryBuilder = Review.query()
      .orderBy('id', 'desc')
      .eager(eager)
      .where('baker_id', userId);

    // if (orderBy && orderBy.column) {
    //   const column = orderBy.column;
    //   let order = 'asc';
    //   if (orderBy.order) {
    //     order = orderBy.order;
    //   }

    //   queryBuilder.orderBy(decamelize(column), order);
    // } else {
    //   queryBuilder.orderBy('id', 'desc');
    // }

    if (filter) {
      // if (has(filter, 'isActive') && filter.isActive !== '') {
      //   queryBuilder.where(function() {
      //     this.where('is_active', filter.isActive);
      //   });
      // }
      // if (has(filter, 'searchText') && filter.searchText !== '') {
      //   queryBuilder
      //     .from('listing')
      //     .leftJoin('listing_cost AS ld', 'ld.listing_id', 'listing.id')
      //     .where(function() {
      //       this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
      //         .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
      //         .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.cost', `%${filter.searchText}%`]));
      //     });
      // }
    }

    const allReviews = camelizeKeys(await queryBuilder);
    const total = allReviews.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { reviews: res, total };
  }

  public async addRating(userId: any, rate: any) {
    const rating = camelizeKeys(
      await Rating.query()
        .where('user_id', '=', userId)
        .orderBy('id', 'desc')
    )[0];
    if (rate && rating) {
      switch (rate) {
        case 5:
          returnId(
            await knex('rating')
              .where('user_id', '=', userId)
              .update({ five: rating.five + 1 })
          );
          break;
        case 4:
          returnId(
            await knex('rating')
              .where('user_id', '=', userId)
              .update({ four: rating.four + 1 })
          );
          break;
        case 3:
          returnId(
            await knex('rating')
              .where('user_id', '=', userId)
              .update({ three: rating.three + 1 })
          );
          break;
        case 2:
          returnId(
            await knex('rating')
              .where('user_id', '=', userId)
              .update({ two: rating.two + 1 })
          );
          break;
        default:
          returnId(
            await knex('rating')
              .where('user_id', '=', userId)
              .update({ one: rating.one + 1 })
          );
      }
    }
  }

  public async addReview(params: Reviews) {
    await this.addRating(params.bakerId, parseInt(Number(params.rating)));
    const res = await Review.query().insert(decamelizeKeys(params));
    // console.log('pramas2', res);
    return res.id;
  }
  public async editReview(params: Reviews & Identifier) {
    const res = await Review.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }

  public deleteReview(id: number) {
    return knex('review')
      .where('id', '=', id)
      .del();
  }

  public async review(id: number) {
    const res = camelizeKeys(
      await Review.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async ratings(bakerId: number) {
    const res = camelizeKeys(
      await Rating.query()
        .where('user_id', '=', bakerId)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res[0];
  }
}

// ReviewImage model.
class ReviewImage extends Model {
  static get tableName() {
    return 'review_image';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: 'review_image.review_id',
          to: 'review.id'
        }
      }
    };
  }
}

// Rating model.
class Rating extends Model {
  static get tableName() {
    return 'rating';
  }

  static get idColumn() {
    return 'id';
  }

  // static get relationMappings() {
  //   return {
  //     review: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Review,
  //       join: {
  //         from: 'rating.user_id',
  //         to: 'review.id'
  //       }
  //     }
  //   };
  // }
}
