exports.up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('company_id');
    table.dropColumn('role_name');
  });
};

exports.down = async (knex) => {
  throw Error('Down migrations not supported');
};
