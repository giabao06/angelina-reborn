import { knex } from 'knex';

const db=require('knex')({
    client: 'sqlite3',
    connection:{
        filename: '../data/db.sqlite',
    },
});

export default db;