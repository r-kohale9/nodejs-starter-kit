import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';

import { User } from '@gqlapp/user-server-ts/sql';
import OrderDAO from '@gqlapp/order-server-ts/sql';
import Addresses from '@gqlapp/addresses-server-ts/sql';

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

const eager = '[user.[profile]]';

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
    const queryBuilder = PaymentOpt.query()
      .eager(eager)
      .orderBy('id', 'desc');

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
  public async userPaymentOpt(userId: number) {
    const res = camelizeKeys(
      await PaymentOpt.query()
        .where('user_id', '=', userId)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
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

  public async defaultPaymentOpt(userId: number) {
    const paymentOpt = await PaymentOpt.query()
      .where('user_id', '=', userId)
      .andWhere('default', '=', true);
    if (paymentOpt) {
      return paymentOpt[0].id;
    } else {
      const payOpt = await PaymentOpt.query().where('user_id', '=', userId);
      return payOpt[0].id;
    }
  }

  public async toggleDefault(id: number, userId: number) {
    const paymentOpt = await PaymentOpt.query()
      .where('user_id', '=', userId)
      .andWhere('default', '=', true);
    if (paymentOpt.length === 0) {
      await knex('payment_opt')
        .where('id', '=', id)
        .update({ default: true });
    } else {
      await knex('payment_opt')
        .where('id', '=', paymentOpt[0].id)
        .update({ default: false });
      await knex('payment_opt')
        .where('id', '=', id)
        .update({ default: true });
    }
    return true;
  }
  public deletePaymentOpt(id: number) {
    return knex('payment_opt')
      .where('id', '=', id)
      .del();
  }

  public async paymentOpt(id: number) {
    const res = camelizeKeys(
      await PaymentOpt.query()
        .eager(eager)
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
}

// PaymentOpt Model
export class PaymentOpt extends Model {
  static get tableName() {
    return 'payment_opt';
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
          from: 'payment_opt.user_id',
          to: 'user.id'
        }
      },
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderDAO,
        join: {
          from: 'payment_opt.id',
          to: 'order.payment_method_id'
        }
      }
    };
  }
}

