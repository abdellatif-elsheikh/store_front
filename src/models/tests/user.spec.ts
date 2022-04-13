import UserModel from '../User.model';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods exist', () => {
    it('index method should be defined', () => {
      expect(userModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(userModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(userModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(userModel.delete).toBeDefined();
    });

    it('authenticate method should be defined', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });
});
