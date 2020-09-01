import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/company.schema';

class Company extends BaseModel {
  static get tableName() {
    return Table.COMPANY;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      employees: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'user'),
        join: {
          from: `${Table.COMPANY}.id`,
          join: `${Table.USER}.companyId`
        }
      }
    };
  }
}

export default Company;
