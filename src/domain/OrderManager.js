import { ERROR_MESSAGE } from '../constants/message.js';

class OrderManager {
  #orderList;

  constructor(order) {
    this.#orderList = this.#parseOrder(order);
    this.#valitateOrder();
  }

  getOrderList() {
    return this.#orderList;
  }

  #parseOrder(order) {
    const orderList = [];
    order.forEach((order) => {
      const orderDetail = {};
      orderDetail.menu = order.split('-')[0];
      orderDetail.quantity = Number(order.split('-')[1]);
      orderList.push(orderDetail);
    });

    return orderList;
  }

  #valitateOrder() {
    this.#isMenuWithinMaxLimit();
    this.#hasDuplicateMenu();
  }

  #isMenuWithinMaxLimit() {
    let totalQuantity = 0;
    this.#orderList.forEach((order) => {
      totalQuantity += order.quantity;
    });

    if (totalQuantity > 20) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasDuplicateMenu() {
    const orderMenus = this.#orderList.map((order) => order.menu);
    this.#orderList.forEach((order) => {
      if (this.#duplicateCount(orderMenus, order) >= 2) {
        throw new Error(ERROR_MESSAGE.invalidOrder);
      }
    });
  }

  #duplicateCount(orderMenus, order) {
    return orderMenus.filter((menu) => menu === order.menu).length;
  }

  getTotalPrice(menuManager) {
    return menuManager.calculateTotalPrice(this.#orderList);
  }
}

export default OrderManager;
