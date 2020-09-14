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
      departments: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'department'),
        join: {
          from: `${Table.COMPANY}.id`,
          to: `${Table.DEPARTMENT}.companyId`
        }
      },
      employees: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'user'),
        join: {
          from: `${Table.COMPANY}.id`,
          to: `${Table.USER}.companyId`
        }
      },
      modules: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'module'),
        join: {
          from: `${Table.COMPANY}.id`,
          through: {
            from: `${Table.COMPANY_MODULE}.companyId`,
            to: `${Table.COMPANY_MODULE}.moduleId`,
            extra: ['moduleCount']
          },
          to: `${Table.MODULE}.id`
        }
      },
      transactions: {
        relation: Model.HasManyRelation,
        model: path.join(__dirname, 'transaction'),
        join: {
          from: `${Table.COMPANY}.id`,
          to: `${Table.TRANSACTION}.companyId`
        }
      }
    };
  }
}

export default Company;
