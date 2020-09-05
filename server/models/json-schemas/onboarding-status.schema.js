export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    completed: { type: 'boolean' },
    currentStep: { type: 'string' }
  },
  required: ['userId'],
  additionalProperties: false
};
