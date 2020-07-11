import { knex } from '@gqlapp/database-server-ts';
import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { User } from '@gqlapp/user-server-ts/sql';

// Give the knex object to objection.
Model.knex(knex);

export interface Address {
  id: number;
  userId: number;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  pinCode: number;
}

export interface Identifier {
  id: number;
}

const eager = '[user.[profile]]';

export default class Addresses extends Model {
  static get tableName() {
    return 'user_address';
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
          from: 'user_address.user_id',
          to: 'user.id'
        }
      }
    };
  }
  public async addresses(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = Addresses.query()
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

    const allAddresses = camelizeKeys(await queryBuilder);
    const total = allAddresses.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { addresses: res, total };
  }
  public async address(id: number) {
    const res = camelizeKeys(
      await Addresses.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }
  public async addAddress(params: Address) {
    return Addresses.query().insertGraph(decamelizeKeys(params));
  }

  public async addOrEditAddress(params: Address) {
    if (params.id) {
      // const status = await this.addressStatus(params);
      await Addresses.query().upsertGraph(decamelizeKeys(params));
      return 'Address edited';
    } else {
      // perform address add
      await Addresses.query().insertGraph(decamelizeKeys(params));
      return 'Address added';
    }
  }

  public deleteAddress(id: number) {
    return knex('user_address')
      .where('id', '=', id)
      .del();
  }
}
