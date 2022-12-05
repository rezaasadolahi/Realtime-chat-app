const { createConnection } = require('mysql')


const MysqlConnection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '4578',
    database: process.env.DATABASE
})


module.exports = MysqlConnection