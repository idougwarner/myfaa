exports.up = async (knex) => {
  await knex.schema.createTable('invitations', (table) => {
    table.increments('id');
    table.string('encrypted_invitation').notNullable().index();
    table.string('invitee_email').notNullable().index();
    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('companies.id')
      .index();
    table.jsonb('metadata');
    table
      .timestamp('created_at')
      .notNullable()
      .default(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').nullable().default(null);
  });
};

exports.down = async (knex) => {
  throw Error('Down migrations not supported');
};
