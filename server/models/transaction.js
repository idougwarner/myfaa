import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/transaction.schema';

class Transaction extends BaseModel {
  static get tableName() {
    return Table.TRANSACTION;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'company'),
        join: {
          from: `${Table.TRANSACTION}.companyId`,
          to: `${Table.COMPANY}.id`
        }
      },
      module: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'module'),
        join: {
          from: `${Table.TRANSACTION}.moduleId`,
          to: `${Table.MODULE}.id`
        }
      },
      coupon: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'coupon'),
        join: {
          from: `${Table.TRANSACTION}.couponId`,
          to: `${Table.COUPON}.id`
        }
      }
    };
  }
}

export default Transaction;
