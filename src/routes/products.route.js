// src/routes/products.route.js
const router = require('express').Router();
const {createProduct, getProduct, updateProduct, deleteProduct, searchProducts, getAllProducts, getProductById} = require('../controllers/products.controller');

  
router.post('/create', createProduct);
  
router.post('/search', searchProducts);

// Get all products
router.get('/', getAllProducts);
  
// Get a product by ID
router.get('/:id', getProductById);
  
// Update a product by ID
router.put('/:id', updateProduct);
  
// Delete a product by ID (soft delete)
router.delete('/:id', deleteProduct);
  

module.exports = router;