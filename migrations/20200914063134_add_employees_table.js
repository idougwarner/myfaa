exports.up = async (knex) => {
  await knex.schema.createTable('employees', (table) => {
    table.increments('id');
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .index();
    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('companies.id')
      .index();
    table.unique(['user_id', 'company_id', 'role_name']);
    table.string('role_name').notNullable().default('Employee');
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
