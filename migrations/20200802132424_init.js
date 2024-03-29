const fs = require('fs');

exports.up = async (knex) => {
  const initialSchema = fs.readFileSync(
    `${__dirname}/initial_db_dump.sql`,
    'utf-8'
  );
  await knex.raw(initialSchema);
};

exports.down = async (knex) => {
  throw Error('Down migrations not supported');
};
