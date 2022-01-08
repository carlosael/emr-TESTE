const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'Teleco.89',
      database : 'registros'
    }
  });


  module.exports = knex;