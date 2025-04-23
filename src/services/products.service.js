
const ProductsModel = require('../models/Product');

class ProductsService {
  async create(productData) {
    try {
      
      return await ProductsModel.create(productData);
    } catch (error) {
      throw new Error(`Product creation failed: ${error.message}`);
    }
  }

  async search(filters) {
    try {
      return await ProductsModel.findAll(filters);
    } catch (error) {
      throw new Error(`Product search failed: ${error.message}`);
    }
  }
  async getAll() {
    try {
      return await ProductsModel.findAll({});
    } catch (error) {
      throw new Error(`Fetching all products failed: ${error.message}`);
    }
  }


  async getById(id) {
    try {
      const product = await ProductsModel.findById(id)
      if (!product) throw new Error('Product not found');
      return product;
    } catch (error) {
      throw new Error(`Fetching product failed: ${error.message}`);
    }
  }
  async delete(id) {
    try {
      return await ProductsModel.delete(id);
    } catch (error) {
      throw new Error(`Product deletion failed: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      return await ProductsModel.update(id, data);
    } catch (error) {
      throw new Error(`Product update failed: ${error.message}`);
    }
  }



  
}



module.exports = new ProductsService();
