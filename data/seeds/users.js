exports.seed = function(knex) {
  return knex('users').then(function() {
    return knex('users').insert([
      { username: 'Jackson', password: 'pass' },
      { username: 'Jen', password: 'pass' },
      { username: 'April', password: 'pass' }
    ]);
  });
};
