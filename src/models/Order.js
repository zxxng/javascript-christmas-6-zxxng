import { ERROR_MESSAGE } from '../constants/messages.js';
import { MENU_LIST } from '../constants/menu.js';
import REGEXS from '../constants/regexs.js';

class Order {
  #orderDetail;

  constructor([name, quantity]) {
    this.#orderDetail = { name, quantity };
    this.#validateOrder();
    this.#convertToItemObject(this.#orderDetail);
  }

  getOrderDetail() {
    return this.#orderDetail;
  }

  #convertToItemObject({ name, quantity }) {
    const menuCategory = MENU_LIST.find((category) => {
      return Object.values(category)[0].hasOwnProperty(name);
    });
    this.#orderDetail = {
      name,
      quantity: Number(quantity),
      price: Object.values(menuCategory)[0][name],
      category: Object.keys(menuCategory)[0],
    };
  }

  #validateOrder() {
    this.#containsInvalidMenuName();
    this.#validateQuantity();
  }

  #containsInvalidMenuName() {
    const menuNames = MENU_LIST.flatMap((category) =>
      Object.values(category).flatMap((menuObject) => Object.keys(menuObject))
    );
    if (!menuNames.includes(this.#orderDetail.name)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #validateQuantity() {
    if (this.#isInvalidQuantity(this.#orderDetail.quantity)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #isInvalidQuantity(quantity) {
    return !quantity || !REGEXS.number.test(quantity) || !Number(quantity);
  }
}

export default Order;
