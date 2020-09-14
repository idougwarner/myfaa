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
      companies: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'company'),
        join: {
          from: `${Table.USER}.id`,
          through: {
            from: `${Table.EMPLOYEE}.user_id`,
            to: `${Table.EMPLOYEE}.company_id`,
            extra: ['roleName']
          },
          to: `${Table.COMPANY}.id`
        }
      },
      onboardingStatus: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'onboarding-status'),
        join: {
          from: `${Table.USER}.id`,
          to: `${Table.ONBOARDING_STATUS}.userId`
        }
      }
    };
  }
}

export default User;
