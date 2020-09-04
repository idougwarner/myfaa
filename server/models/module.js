import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/module.schema';

class Module extends BaseModel {
  static get tableName() {
    return Table.MODULE;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      courses: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'course'),
        join: {
          from: `${Table.MODULE}.id`,
          to: `${Table.COURSE}.moduleId`
        }
      }
    };
  }
}

export default Module;
