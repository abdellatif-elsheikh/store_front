import OrderModel from '../Order.model';

const orderModel = new OrderModel();

fdescribe('Order model', () => {
  describe('Test methods exist', () => {
    it('index method should be defined', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(orderModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(orderModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(orderModel.delete).toBeDefined();
    });

    it('update method should be defined', () => {
      expect(orderModel.update).toBeDefined();
    });

    it('getOrdersByUserId method should be defined', () => {
      expect(orderModel.getOrdersByUserId).toBeDefined();
    });
  });
});
