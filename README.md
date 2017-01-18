# Refrigerator Adventures

A humble little application for building an API with Express and Knex and consuming it with React and Redux.

## Notes

- You should have Postgres installed on your computer.

### Setting Up the Database

```js
const database = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});
```

### Setup

```
npm install knex -g
```

```
→ knex init
Created ./knexfile.js
```

#### Additional Configuration

```js
development: {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  migrations: {
    directory: './server/migrations'
  },
  seeds: {
    directory: './server/seeds/dev'
  }
},
```

### Migrations

```
knex migrate:make initial
```

This created a `migrations` directory at the root of the project and added a time stamped file with the name of the migration at the end.

The file should look something like this:

```js
exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {

};
```

I editted as follows:

```js
exports.up = (knex, Promise) => {
  return knex.schema.createTable('Food', (t) => {
    t.increments('id').primary();
    t.string('name', 100);
    t.integer('quantity');
    t.text('notes');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Food');
};
```

(But, why is `Promise` passed in as a second argument? Write a paragraph here elaborating on how you have to return a single promise. `Promise.all` allows you to do multiple things and return one promise. We're not using it at this moment, but we will in a second.)

`knex migrate:latest`

### Seeds

Seeds are some default data. This will be useful when we first start developing our application.

```js
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('table_name').insert({id: 1, colName: 'rowValue1'}),
        knex('table_name').insert({id: 2, colName: 'rowValue2'}),
        knex('table_name').insert({id: 3, colName: 'rowValue3'})
      ]);
    });
};
```

We're going to need to modify this a bit.

```js

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('Food').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('Food').insert({
          id: 1,
          name: 'Vegan ham',
          quantity: 'Two',
          notes: 'These were a great deal. I got two of them for $20.'
        }),
        knex('Food').insert({
          id: 2,
          name: 'Cocktail olives',
          quantity: '1 jar',
          notes: 'Martinis were fun for like one night.'
        }),
        knex('Food').insert({
          id: 3,
          name: 'Unidentifiable leftovers',
          quantity: 'Undisclosed quantity',
          notes: 'I think this might be from that last potluck.'
        })
      ]);
    });
};
```

