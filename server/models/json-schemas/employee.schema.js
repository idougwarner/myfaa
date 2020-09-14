export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    companyId: { type: 'integer' },
    roleName: { type: 'string' },
    supervisorEmail: { type: 'string' },
    title: { type: 'string' },
    departmentId: { type: 'integer' },
    safetySensitive: { type: 'boolean' }
  },
  required: ['roleName'],
  additionalProperties: false
};
