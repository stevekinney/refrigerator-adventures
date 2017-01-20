const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

database.select()
        .table('Food')
        .then(console.log)
        .catch(console.error);
