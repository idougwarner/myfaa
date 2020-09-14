export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    companyId: { type: 'integer' }
  },
  required: ['name'],
  additionalProperties: false
};
