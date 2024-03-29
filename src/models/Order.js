import { ERROR_MESSAGE } from '../constants/messages.js';
import { MENU_LIST } from '../constants/menu.js';
import REGEXS from '../constants/regexs.js';

class Order {
  #orderMenu;

  constructor([name, quantity]) {
    this.#orderMenu = { name, quantity };
    this.#validateOrder();
    this.#convertToItemObject(this.#orderMenu);
  }

  getOrderMenu() {
    return this.#orderMenu;
  }

  #convertToItemObject({ name, quantity }) {
    const foundCategory = this.#findCategoryByName(name);
    const foundCategoryList = Object.values(foundCategory)[0];
    const foundCategoryName = Object.keys(foundCategory)[0];
    this.#orderMenu = {
      name,
      quantity: Number(quantity),
      price: foundCategoryList[name],
      category: foundCategoryName,
    };
  }

  #findCategoryByName(name) {
    return MENU_LIST.find((category) => {
      const currentCategory = Object.values(category)[0];
      return currentCategory.hasOwnProperty(name);
    });
  }

  #validateOrder() {
    this.#containsInvalidMenuName();
    this.#validateQuantity();
  }

  #containsInvalidMenuName() {
    const menuNames = MENU_LIST.flatMap((category) =>
      Object.values(category).flatMap((menuObject) => Object.keys(menuObject))
    );
    if (!menuNames.includes(this.#orderMenu.name)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #validateQuantity() {
    if (this.#isInvalidQuantity(this.#orderMenu.quantity)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  /**
   * 값이 없거나, 0-9 범위의 문자가 아니거나, Number로 변환했을 때 0인경우 에러를 발생합니다.
   * @param {string} quantity
   */
  #isInvalidQuantity(quantity) {
    return !quantity || !REGEXS.number.test(quantity) || !Number(quantity);
  }
}

export default Order;
