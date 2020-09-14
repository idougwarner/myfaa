import { Company, Department } from '@server/models';

export default {
  Department: {
    company: (department, _, { loaders }) =>
      loaders.company.load(department.companyId),
    courses: (department) =>
      Department.relatedQuery('courses').for(department.id)
  },
  Query: {
    departments: (parent, args, { user }) =>
      Company.relatedQuery('departments').for(user.companyId)
  },
  Mutation: {
    createDepartment: (_, { name }, { user }) =>
      Company.relatedQuery('departments')
        .for(user.companyId)
        .insert({ name })
        .returning('*'),
    assignCourse: async (_, { departmentId, courseId, assign }) => {
      const queryBuilder = Department.relatedQuery('courses').for(departmentId);
      if (assign) {
        await queryBuilder.relate(courseId);
      } else {
        await queryBuilder.unrelate().where('courses.id', courseId);
      }
    }
  }
};
