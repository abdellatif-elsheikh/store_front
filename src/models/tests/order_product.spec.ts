import OrderProductModel from '../OrderProduct.model';

const orderProductModel = new OrderProductModel();

describe('order products model', () => {
  describe('test methods exist', () => {
    it('index method should be defined', () => {
      expect(orderProductModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(orderProductModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(orderProductModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(orderProductModel.delete).toBeDefined();
    });

    it('update method should be defined', () => {
      expect(orderProductModel.update).toBeDefined();
    });
  });
});
