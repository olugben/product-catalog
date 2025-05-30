const productsService = require('../services/products.service');
const ProductsService = require('../services/products.service');



const createProduct = async (req, res, next) => {
  try {
    
    const { name, price, stock } = req.body;
    // Validate required fields
    if (!name ||!price ||!stock) {
 
      throw new Error('Name, price, and stock are required');
    }

    // Validate data types
    if (isNaN(req.body.price) || isNaN(req.body.stock)) {
      throw new Error('Price and stock must be numbers');
    }
    
    const product = await productsService.create({name, price, stock})
    
    res.status(201).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
const searchProducts = async (req, res, next) => {
  try {
    const { name, minPrice, maxPrice } = req.body;

    

    const products = await productsService.search({
      name,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: { products },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};


const getAllProducts = async (req, res, next) => {
  try {

    const products = await productsService.getAll();

    res.status(200).json({
      status: 'success',
      data: { products }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productsService.getById(id)

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, price, stock } = req.body;

    if (price && isNaN(price)) {
      throw new Error('Price must be a number');
    }
    if (stock && isNaN(stock)) {
      throw new Error('Stock must be a number');
    }

    const updated = await productsService.update(id, { name, price, stock });

    if (!updated) {
      throw new Error(`No product found with ID ${id}`);
    }

    res.status(200).json({
      status: 'success',
      data: { product: updated }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await productsService.delete(id);

    if (!deleted) {
      throw new Error(`No product found with ID ${id}`);
    }

    res.status(200).json({
      status: 'success',
      message: `Product ${id} soft deleted`
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};



module.exports = {
  createProduct,
  searchProducts,
  getAllProducts,
  getProductById,
  updateProduct, 
  deleteProduct
};