//Importing Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

//Using JAWSDB_URL in the creation of a new Sequelize instance
const sequelize = process.env.JAWSDB_URL
? new Sequelize(process.env.JAWSDB_URL)
: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});


