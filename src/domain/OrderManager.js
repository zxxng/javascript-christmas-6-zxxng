import { ERROR_MESSEGE } from '../constants/messege';

class OrderManager {
  #orderList;

  constructor(order) {
    // this.#orderList = parseOrder(order);
  }

  parseOrder(order) {
    const orderList = [];
    order.forEach((order) => {
      const orderDetail = {};
      orderDetail.menu = order.split('-')[0];
      orderDetail.quantity = Number(order.split('-')[1]);
      orderList.push(orderDetail);
    });

    return orderList;
  }
}

export default OrderManager;
