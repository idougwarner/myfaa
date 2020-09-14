export default {
  Course: {
    module: (course, _, { loaders }) => loaders.module.load(course.moduleId)
  }
};
