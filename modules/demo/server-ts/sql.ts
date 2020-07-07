import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';
import ListingDAO from '@gqlapp/listing-server-ts/sql';

Model.knex(knex);

export interface PromoCode {
  title: string;
  image_url: string;
  validity: number;
  promo_code: string;
}

export interface Identifier {
  id: number;
}

// Demo model.
export default class Demo extends Model {
  // static get tableName() {
  //   return 'listing_bookmark';
  // }

  static get idColumn() {
    return 'id';
  }

  // static get relationMappings() {
  //   return {
  //     listing: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: ListingDAO,
  //       join: {
  //         from: 'listing_bookmark.listing_id',
  //         to: 'listing.id'
  //       }
  //     }
  //   };
  // }
  public async promoCodesPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = PromoCode.query().orderBy('id', 'desc');

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
      //   if (has(filter, 'searchText') && filter.searchText !== '') {
      //     queryBuilder
      //       .from('listing')
      //       .leftJoin('listing_cost AS ld', 'ld.listing_id', 'listing.id')
      //       .where(function() {
      //         this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
      //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
      //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.cost', `%${filter.searchText}%`]));
      //       });
      //   }
    }

    const allListings = camelizeKeys(await queryBuilder);
    const total = allListings.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { promoCodes: res, total };
  }
}

// PromoCode Model
class PromoCode extends Model {
  static get tableName() {
    return 'promo_code';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      // listing: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: ListingDAO,
      //   join: {
      //     from: 'listing_bookmark.listing_id',
      //     to: 'listing.id'
      //   }
      // }
    };
  }
}

