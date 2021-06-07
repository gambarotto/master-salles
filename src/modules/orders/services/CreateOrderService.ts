import Order from '../infra/typeorm/entities/Order';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  user_id: string;
  billing_address_id: string;
  shipping_address_id: string;
  status: string;
  method_payment_id?: string;
  delivery: boolean;
  transaction_id?: string;
  total: number;
}

class CreateOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  public async execute({
    user_id,
    billing_address_id,
    shipping_address_id,
    status,
    method_payment_id,
    delivery,
    transaction_id,
    total,
  }: IRequest): Promise<Order> {}
}
export default CreateOrderService;
