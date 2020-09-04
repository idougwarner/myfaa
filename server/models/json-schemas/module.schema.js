export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    logoUrl: { type: 'string' },
    price: { type: 'integer' }
  },
  required: ['name', 'description', 'logoUrl', 'price'],
  additionalProperties: false
};
