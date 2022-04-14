import ProductModel from '../Product.model';
import Product from '../../types/Product.type';
import db from '../../database';

const productModel = new ProductModel();

describe('Product model', () => {
  describe('Test methods exist', () => {
    it('index method should be defined', () => {
      expect(productModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(productModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(productModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(productModel.delete).toBeDefined();
    });

    it('update method should be defined', () => {
      expect(productModel.update).toBeDefined();
    });
  });

  describe('test product model methods behaviors', () => {
    const product = {
      name: 'testProduct',
      price: 100,
      category: 'category',
    } as Product;
    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM products;';
      await conn.query(sql);
      conn.release();
    });

    it('create method should create new product', async () => {
      const result = await productModel.create(product);
      const { id, name, price, category } = result;
      product.id = id;
      expect(id).toBe(product.id);
      expect(name).toBe(product.name);
      expect(price).toBe('100.00' as unknown as number);
      expect(category).toBe(product.category);
    });

    it('index method should return all available products', async () => {
      const products = await productModel.index();
      expect(products.length).toBe(1);
      const { id, name, price, category } = products[0];
      expect(id).toBe(product.id);
      expect(name).toBe(product.name);
      expect(price).toBe('100.00' as unknown as number);
      expect(category).toBe(product.category);
    });

    it('getOne method should return product with specific id', async () => {
      const result = await productModel.getOne(product.id as unknown as string);
      const { id, name, price, category } = result;
      expect(id).toBe(product.id);
      expect(name).toBe(product.name);
      expect(price).toBe('100.00' as unknown as number);
      expect(category).toBe(product.category);
    });

    it('update method should update the product with givin id', async () => {
      const result = await productModel.update(
        product.id as unknown as string,
        { ...product, price: 200 }
      );
      const { id, name, price, category } = result;
      product.id = id;
      expect(id).toBe(product.id);
      expect(name).toBe(product.name);
      expect(price).toBe('200.00' as unknown as number);
      expect(category).toBe(product.category);
    });

    it('delete method should delete product with givin id', async () => {
      const deleted = await productModel.delete(
        product.id as unknown as string
      );
      expect(deleted.status).toBe(200);
      expect(deleted.message).toBe('Product deleted successfully');
    });
  });
});
