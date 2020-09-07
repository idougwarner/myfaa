export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    lastStep: { type: 'string' }
  },
  required: ['userId'],
  additionalProperties: false
};
