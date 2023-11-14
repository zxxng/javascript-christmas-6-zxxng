import { ERROR_MESSAGE } from '../constants/messages.js';
import { MENU_TYPE } from '../constants/menu.js';
import { UNIT, PROPERTY } from '../constants/options.js';

class OrderManager {
  #orderList;
  #menuManager;

  constructor(order, menuManager) {
    this.#menuManager = menuManager;
    this.#orderList = this.#parseOrder(order);
    this.#validateOrder();
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

  #validateOrder() {
    this.#isMenuWithinMaxLimit();
    this.#containsInvalidMenuName();
    this.#hasDuplicateMenu();
    this.#hasOnlyBeverages();
  }

  #isMenuWithinMaxLimit() {
    const totalQuantity = this.#orderList.reduce((total, order) => total + order.quantity, 0);
    if (totalQuantity > UNIT.maximumQuantity) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #containsInvalidMenuName() {
    const menuNames = this.#menuManager.getMenuList().map((menu) => menu.name);
    if (this.#orderList.some((order) => !menuNames.includes(order.menu))) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasDuplicateMenu() {
    const orderMenus = this.#orderList.map((order) => order.menu);
    if (orderMenus.length !== new Set(orderMenus).size) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #hasOnlyBeverages() {
    let isBeverage = true;
    this.#orderList.forEach((order) => {
      if (this.#menuManager.findProperty(order.menu, PROPERTY.type) !== MENU_TYPE.beverage) {
        isBeverage = false;
      }
    });

    if (isBeverage) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }
}

export default OrderManager;
