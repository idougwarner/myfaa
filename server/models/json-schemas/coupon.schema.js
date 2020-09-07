export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    discountPercent: { type: 'integer' },
    discountAmount: { type: 'integer' }
  },
  required: ['name'],
  additionalProperties: false
};
