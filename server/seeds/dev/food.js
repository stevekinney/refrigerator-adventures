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
