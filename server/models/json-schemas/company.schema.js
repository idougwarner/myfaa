export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    street: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zipcode: { type: 'string' },
    country: { type: 'string' },
    maxEmployeeCount: { type: 'integer' }
  },
  required: ['name', 'street', 'city', 'state', 'zipcode'],
  additionalProperties: false
};
