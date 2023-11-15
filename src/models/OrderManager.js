import Order from './Order.js';
import { ERROR_MESSAGE } from '../constants/messages.js';
import { UNIT } from '../constants/options.js';

class OrderManager {
  #orderList;

  constructor(orderInput) {
    this.#orderList = this.#createOrder(orderInput);
    this.#validateOrderList();
  }

  getOrderList() {
    return this.#orderList;
  }

  getTotalPrice() {
    return this.#orderList.reduce((total, order) => {
      const orderDetail = order.getOrderDetail();
      return total + orderDetail.price * orderDetail.quantity;
    }, 0);
  }

  getEstimatedPayment(eventManager) {
    return this.getTotalPrice() + eventManager.getTotalDiscount();
  }

  /**
   * 주어진 속성으로 주문을 필터링합니다. propertyValue가 주어지지 않으면 해당 속성의 모든 값을 반환합니다.
   * @param {string} property
   * @param {string} propertyValue
   */
  filterItemsByProperty(property, propertyValue = '') {
    const propertyValues = this.#orderList.map((order) => {
      const orderDetail = order.getOrderDetail();
      return orderDetail[property];
    });

    return propertyValues.filter((value) => value.includes(propertyValue));
  }

  #createOrder(orderInput) {
    return orderInput.map((item) => {
      return new Order(item.split('-'));
    });
  }

  #validateOrderList() {
    this.#isMenuWithinMaxLimit();
    this.#hasDuplicateMenu();
    this.#hasOnlyBeverages();
  }

  #isMenuWithinMaxLimit() {
    const totalQuantity = this.#orderList.reduce((total, order) => {
      const orderDetail = order.getOrderDetail();
      return total + orderDetail.quantity;
    }, 0);
    if (totalQuantity > UNIT.maximumQuantity) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasDuplicateMenu() {
    const orderNames = this.filterItemsByProperty('name');
    if (orderNames.length !== new Set(orderNames).size) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasOnlyBeverages() {
    const beverageQuantity = this.filterItemsByProperty('category', 'beverage').length;
    if (this.#orderList.length === beverageQuantity) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }
}

export default OrderManager;
