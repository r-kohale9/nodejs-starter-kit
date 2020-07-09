import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';

Model.knex(knex);

export interface PaymentOpts {
  userId: number;
  card_number: string;
  expiry_date: string;
  owner: string;
  default: string;
}
export interface PromoCodes {
  title: string;
  imageUrl: string;
  validity: number;
  promoCode: string;
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

  public async addPromoCode(params: PromoCodes) {
    // console.log('pramas', decamelizeKeys(params));
    const res = await PromoCode.query().insert(decamelizeKeys(params));
    // console.log('pramas2', res);
    return res.id;
  }
  public async editPromoCode(params: PromoCodes & Identifier) {
    const res = await PromoCode.query().upsertGraph(decamelizeKeys(params));
    console.log('res', res);
    return res.id;
  }

  public deletePromoCode(id: number) {
    return knex('promo_code')
      .where('id', '=', id)
      .del();
  }

  public async promoCode(id: number) {
    const res = camelizeKeys(
      await PromoCode.query()
        .findById(id)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async paymentOptsPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = PaymentOpt.query().orderBy('id', 'desc');

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

    const allPaymentOpt = camelizeKeys(await queryBuilder);
    const total = allPaymentOpt.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { paymentOpts: res, total };
  }

  public async addPaymentOpt(params: PromoCodes) {
    // console.log('pramas', decamelizeKeys(params));
    const res = await PaymentOpt.query().insert(decamelizeKeys(params));
    // console.log('pramas2', res);
    return res.id;
  }
  public async editPaymentOpt(params: PromoCodes & Identifier) {
    const res = await PaymentOpt.query().upsertGraph(decamelizeKeys(params));
    console.log('res', res);
    return res.id;
  }

  public deletePaymentOpt(id: number) {
    return knex('promo_code')
      .where('id', '=', id)
      .del();
  }

  public async paymentOpt(id: number) {
    const res = camelizeKeys(
      await PaymentOpt.query()
        .findById(id)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
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

// PaymentOpt Model
class PaymentOpt extends Model {
  static get tableName() {
    return 'payment_opt';
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

