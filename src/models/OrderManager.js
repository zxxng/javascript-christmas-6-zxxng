import { ERROR_MESSAGE } from '../constants/messages.js';
import { UNIT } from '../constants/options.js';

class OrderManager {
  #orderList;

  constructor(orderList) {
    this.#orderList = orderList;
    this.#validateOrderList();
  }

  getOrderList() {
    return this.#orderList;
  }

  getTotalPrice() {
    return this.#orderList.reduce((total, order) => {
      const orderMenu = order.getOrderMenu();
      return total + orderMenu.price * orderMenu.quantity;
    }, 0);
  }

  getEstimatedPayment(eventManager) {
    return this.getTotalPrice() + eventManager.getTotalDiscount();
  }

  /**
   * 주어진 속성에 propertyValue가 있으면 해당 객체를 반환합니다.
   * @param {string} property
   * @param {string} propertyValue
   */
  filterItemsByProperty(property, propertyValue) {
    return this.#orderList.filter((order) => {
      const orderMenu = order.getOrderMenu();
      return orderMenu[property] === propertyValue;
    });
  }

  #validateOrderList() {
    this.#isMenuWithinMaxLimit();
    this.#hasDuplicateMenu();
    this.#hasOnlyBeverages();
  }

  #isMenuWithinMaxLimit() {
    const totalQuantity = this.#orderList.reduce((total, order) => {
      const orderMenu = order.getOrderMenu();
      return total + orderMenu.quantity;
    }, 0);
    if (totalQuantity > UNIT.maximumQuantity) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasDuplicateMenu() {
    const orderNames = this.#orderList.map((menu) => {
      const orderMenu = menu.getOrderMenu();
      return orderMenu.name;
    });
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
