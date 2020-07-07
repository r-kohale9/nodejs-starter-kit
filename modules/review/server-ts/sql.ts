import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';

Model.knex(knex);

export interface Reviews {
  userId: number;
  feedback: string;
  rating: number;
  listingId: number;
  reviewImages: ReviewImage[];
}
export interface Identifier {
  id: number;
}
const eager = '[review_images]';

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

  public async reviewsPagination(limit: number, after: number, orderBy: any, filter: any, userId: number) {
    const queryBuilder = Review.query()
      .orderBy('id', 'desc')
      .eager(eager)
      .where('user_id', userId);

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

  public async addReview(params: Reviews) {
    // console.log('pramas', decamelizeKeys(params));
    const res = await Review.query().insert(decamelizeKeys(params));
    // console.log('pramas2', res);
    return res.id;
  }
  public async editReview(params: Reviews & Identifier) {
    const res = await Review.query().upsertGraph(decamelizeKeys(params));
    console.log('res', res);
    return res.id;
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
