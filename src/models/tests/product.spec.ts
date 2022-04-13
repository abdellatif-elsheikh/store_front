import ProductModel from '../Product.model';

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
});
