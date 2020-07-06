import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';

Model.knex(knex);

export interface Reviews {
  userId: number;
  title: string;
  description: string;
  isActive: boolean;
  reviewImages: ReviewImage[];
}
export interface Identifier {
  id: number;
}
const eager = '[review_images]';

// Review model.
export default class Review extends Model {
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
    console.log(res);
    return { reviews: res, total };
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
