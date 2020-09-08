export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    lastStep: { type: 'string' },
    moduleId: { type: 'integer' }
  },
  required: ['userId'],
  additionalProperties: false
};
