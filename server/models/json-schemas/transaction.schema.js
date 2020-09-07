export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    companyId: { type: 'integer' },
    moduleId: { type: 'integer' },
    moduleCount: { type: 'integer' },
    couponId: { type: ['integer', 'null'] },
    amount: { type: 'integer' }
  },
  required: ['companyId', 'moduleId', 'moduleCount', 'amount'],
  additionalProperties: false
};
