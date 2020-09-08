export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    companyId: { type: 'integer' },
    moduleId: { type: 'integer' },
    moduleCount: { type: 'integer' },
    couponId: { type: ['integer', 'null'] },
    amount: { type: 'integer' },
    paymentIntentId: { type: 'string' }
  },
  required: [
    'companyId',
    'moduleId',
    'moduleCount',
    'amount',
    'paymentIntentId'
  ],
  additionalProperties: false
};
