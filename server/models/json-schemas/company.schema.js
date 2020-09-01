export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    street: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zipcode: { type: 'string' },
    employeeCount: { type: 'integer' }
  },
  required: [
    'id',
    'name',
    'street',
    'city',
    'state',
    'zipcode',
    'employeeCount'
  ],
  additionalProperties: false
};
