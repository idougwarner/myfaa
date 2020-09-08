export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    code: { type: 'string' },
    discountPercent: { type: 'integer' },
    discountAmount: { type: 'integer' }
  },
  required: ['name', 'code'],
  additionalProperties: false
};
