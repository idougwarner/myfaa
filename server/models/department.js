import path from 'path';
import { Model } from 'objection';
import { Table } from '@server/db/common';
import BaseModel from './base';
import jsonSchema from './json-schemas/department.schema';

class Department extends BaseModel {
  static get tableName() {
    return Table.DEPARTMENT;
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
          from: `${Table.DEPARTMENT}.companyId`,
          to: `${Table.COMPANY}.id`
        }
      },
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'course'),
        join: {
          from: `${Table.DEPARTMENT}.id`,
          through: {
            from: `${Table.NEED_ASSESSMENT}.departmentId`,
            to: `${Table.NEED_ASSESSMENT}.courseId`
          },
          to: `${Table.COURSE}.id`
        }
      }
    };
  }
}

export default Department;
