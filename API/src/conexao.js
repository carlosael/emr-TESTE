const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : '',
      database : 'registros'
    }
  });


  module.exports = knex;