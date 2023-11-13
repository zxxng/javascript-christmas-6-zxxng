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
    return order.map((item) => {
      const [menu, quantity] = item.split('-');
      return { menu, quantity: Number(quantity) };
    });
  }

  #valitateOrder() {
    this.#isMenuWithinMaxLimit();
    this.#hasDuplicateMenu();
  }

  #isMenuWithinMaxLimit() {
    const totalQuantity = this.#orderList.reduce((total, order) => total + order.quantity, 0);
    if (totalQuantity > 20) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasDuplicateMenu() {
    const orderMenus = this.#orderList.map((order) => order.menu);
    if (orderMenus.length !== new Set(orderMenus).size) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  getTotalPrice(menuManager) {
    return menuManager.calculateTotalPrice(this.#orderList);
  }
}

export default OrderManager;
