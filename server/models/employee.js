import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/employee.schema';

class Employee extends BaseModel {
  static get tableName() {
    return Table.EMPLOYEE;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'user'),
        join: {
          from: `${Table.EMPLOYEE}.userId`,
          to: `${Table.USER}.id`
        }
      },
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'company'),
        join: {
          from: `${Table.EMPLOYEE}.companyId`,
          to: `${Table.COMPANY}.id`
        }
      }
    };
  }
}

export default Employee;
