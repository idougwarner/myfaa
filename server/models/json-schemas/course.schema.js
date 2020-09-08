export default {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    videoUrl: { type: 'string' },
    sequence: { type: 'integer' },
    moduleId: { type: 'integer' }
  },
  required: ['name', 'videoUrl', 'sequence', 'moduleId'],
  additionalProperties: false
};
