import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/coupon.schema';

class Coupon extends BaseModel {
  static get tableName() {
    return Table.COUPON;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      transactions: {
        relation: Model.HasManyRelation,
        model: path.join(__dirname, 'transaction'),
        join: {
          from: `${Table.COUPON}.id`,
          to: `${Table.TRANSACTION}.couponId`
        }
      }
    };
  }
}

export default Coupon;
