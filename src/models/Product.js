// src/models/products.model.js
const db = require('../db'); // assumes you're exporting a db pool or client

const ProductsModel = {
 


    async create({ name, price, stock }) {
        // Log the received data to debug
       
        // Prepare the query to insert data into the products table
        const query = `
          INSERT INTO products (name, price, stock)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        
        // Values to be inserted
        const values = [name, parseFloat(price), parseInt(stock)];
      
        try {
          // Execute the query and return the inserted row
          const { rows } = await db.query(query, values);
          return rows[0]; // Return the first row (the inserted product)
        } catch (error) {
          // Handle errors during the insertion process
          throw new Error(`Product creation failed: ${error.message}`);
        }
      }
,      
async findAll({ name, minPrice, maxPrice }) {
    let query = 'SELECT * FROM products WHERE deleted_at IS NULL';
    const values = [];
    let index = 1;
  
    if (typeof name !== 'undefined') {
      query += ` AND name ILIKE $${index++}`;
      values.push(`%${name}%`);
    }
  
    if (typeof minPrice !== 'undefined') {
      query += ` AND price >= $${index++}`;
      values.push(minPrice);
    }
  
    if (typeof maxPrice !== 'undefined') {
      query += ` AND price <= $${index++}`;
      values.push(maxPrice);
    }
  
    query += ' ORDER BY created_at DESC';
  
    const { rows } = await db.query(query, values);
    return rows;
  }
,  
// Find by ID
async findById(id) {
  const query = `
    SELECT * FROM products
    WHERE id = $1 AND deleted_at IS NULL;
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
}
,
  // Soft delete
  async delete(id) {
    const query = `
      UPDATE products SET deleted_at = NOW()
      WHERE id = $1 RETURNING *;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  // Update
  async update(id, data) {
    const fields = [];
    const values = [];
    let i = 1;

    for (const key in data) {
      fields.push(`${key} = $${i++}`);
      values.push(data[key]);
    }

    values.push(id);
    const query = `
      UPDATE products SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${i} AND deleted_at IS NULL
      RETURNING *;
    `;
    const { rows } = await db.query(query, values);
    return rows[0];
  }
};

module.exports = ProductsModel;
