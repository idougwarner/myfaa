import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/user.schema';

class User extends BaseModel {
  static get tableName() {
    return Table.USER;
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
          from: `${Table.USER}.companyId`,
          to: `${Table.COMPANY}.id`
        }
      }
    };
  }
}

export default User;
