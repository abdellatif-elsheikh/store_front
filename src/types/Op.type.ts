type OpProduct = {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity: number;
};

type ReturenOP = {
  id: string;
  order_id: string;
  user: string;
  product: OpProduct;
};

export default ReturenOP;
