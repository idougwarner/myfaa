import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/onboarding-status.schema';

class OnboardingStatus extends BaseModel {
  static get tableName() {
    return Table.ONBOARDING_STATUS;
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
          from: `${Table.ONBOARDING_STATUS}.userId`,
          to: `${Table.USER}.id`
        }
      }
    };
  }
}

export default OnboardingStatus;
