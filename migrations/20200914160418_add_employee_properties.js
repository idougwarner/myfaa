exports.up = async (knex) => {
  await knex.schema.alterTable('employees', (table) => {
    table.string('supervisor_email');
    table.string('title');
    table
      .integer('department_id')
      .unsigned()
      .references('departments.id')
      .index();
    table.boolean('safetySensitive').default(false);
  });
};

exports.down = async (knex) => {
  throw Error('Down migrations not supported');
};
