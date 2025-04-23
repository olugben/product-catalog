const { Client } = require('pg');
const dotenv = require("dotenv")

dotenv.config()

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '8599',
  database: process.env.DB_NAME || 'product_catalog'
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Error connecting to PostgreSQL', err.stack));
module.exports=client