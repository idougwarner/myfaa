export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    encryptedInvitation: { type: 'string' },
    inviteeEmail: { type: 'string' },
    companyId: { type: 'integer' },
    metadata: { type: 'object' }
  },
  required: ['encryptedInvitation', 'inviteeEmail'],
  additionalProperties: false
};
