const service = require('../services/products.service');
const ProductsModel = require('../models/Product');

jest.mock('../models/Product');

describe('ProductsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const productData = { name: 'Test Product', price: 10.99, stock: 50 };
      const createdProduct = { id: 1, ...productData };

      ProductsModel.create.mockResolvedValue(createdProduct);

      const result = await service.create(productData);
      expect(result).toEqual(createdProduct);
      expect(ProductsModel.create).toHaveBeenCalledWith(productData);
    });

    it('should throw an error if product creation fails', async () => {
      ProductsModel.create.mockRejectedValue(new Error('DB error'));

      await expect(service.create({}))
        .rejects
        .toThrow('Product creation failed: DB error');
    });
  });

  describe('getAll', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A', price: 10.0, stock: 100 },
        { id: 2, name: 'Product B', price: 20.0, stock: 50 },
      ];

      ProductsModel.findAll.mockResolvedValue(mockProducts);

      const result = await service.getAll();
      expect(result).toEqual(mockProducts);
      expect(ProductsModel.findAll).toHaveBeenCalledWith({});
    });

    it('should throw an error if fetching products fails', async () => {
      ProductsModel.findAll.mockRejectedValue(new Error('DB error'));

      await expect(service.getAll())
        .rejects
        .toThrow('Fetching all products failed: DB error');
    });
  });
});
