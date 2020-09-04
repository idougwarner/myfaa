import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/course.schema';

class Course extends BaseModel {
  static get tableName() {
    return Table.COURSE;
  }

  static get jsonSchema() {
    return jsonSchema;
  }

  static get relationMappings() {
    return {
      module: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'module'),
        join: {
          from: `${Table.COURSE}.moduleId`,
          to: `${Table.MODULE}.id`
        }
      }
    };
  }
}

export default Course;
