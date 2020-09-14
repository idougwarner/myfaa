exports.up = async (knex) => {
  await knex.schema.alterTable('onboarding_statuses', async (table) => {
    table.string('role_name').default('Employee');
  });
};

exports.down = async (knex) => {
  throw Error('Down migrations not supported');
};
