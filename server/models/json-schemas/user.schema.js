export default {
  type: 'object',
  required: [
    'email',
    'auth0Id',
    'firstName',
    'lastName',
    'phoneNumber',
    'roleName'
  ],
  properties: {
    id: { type: 'integer' },
    auth0Id: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string', minLength: 1, maxLength: 255 },
    lastName: { type: 'string', minLength: 1, maxLength: 255 },
    phoneNumber: { type: 'string' }, // must confirms to the standard E.164 format
    companyId: { type: ['integer', 'null'] },
    roleName: { type: 'string' }
  },
  additionalProperties: false
};
