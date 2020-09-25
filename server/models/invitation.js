import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/invitation.schema';

class Invitation extends BaseModel {
  static get tableName() {
    return Table.INVITATION;
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
          from: `${Table.INVITATION}.companyId`,
          to: `${Table.COMPANY}.id`
        }
      }
    };
  }
}

export default Invitation;
