const sqlite3 = require('sqlite3')
const sqlite = require ('sqlite')

async function init(){
    return await sqlite.open({
        filename: '../data/db.sqlite',
        driver: sqlite3.Database
    })
}

module.exports = init();