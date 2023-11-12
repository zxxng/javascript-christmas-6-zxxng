import { MENU_LIST } from '../constants/menu.js';
import { ERROR_MESSAGE } from '../constants/message.js';

class MenuManager {
  #menuList;

  constructor() {
    this.#menuList = [];
    this.#generateMenusFromList();
  }

  getMenuList() {
    return this.#menuList;
  }

  #generateMenusFromList() {
    MENU_LIST.forEach((menuItem) => {
      this.#addMenuItems(menuItem.list, menuItem.type);
    });
  }

  #addMenuItems(list, type) {
    list.forEach((menuItem) => {
      this.#menuList.push({
        type: type,
        name: menuItem[0],
        price: menuItem[1],
      });
    });
  }

  calculateTotalPrice(orderList) {
    let totalPrice = 0;
    orderList.forEach((order) => {
      totalPrice += this.#findProperty(order.menu, 'price') * order.quantity;
    });

    return totalPrice;
  }

  countMenuType(orderList, type) {
    let count = 0;
    orderList.forEach((order) => {
      if (this.#findProperty(order.menu, 'type') === type) {
        count += order.quantity;
      }
    });

    return count;
  }

  validateMenu(orderList) {
    this.#containsInvalidMenuName(orderList);
    this.#hasOnlyBeverages(orderList);
  }

  #containsInvalidMenuName(orderList) {
    const menuNames = this.#menuList.map((menu) => menu.name);
    orderList.forEach((order) => {
      if (!menuNames.includes(order.menu)) {
        throw new Error(ERROR_MESSAGE.invalidOrder);
      }
    });
  }

  #hasOnlyBeverages(orderList) {
    let isBeverage = true;
    orderList.forEach((order) => {
      if (this.#findProperty(order.menu, 'type') !== 'beverage') {
        isBeverage = false;
      }
    });

    if (isBeverage) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #findProperty(orderMenu, findProperty) {
    const menu = this.#menuList.find((menu) => menu.name === orderMenu);
    return menu[findProperty];
  }
}

export default MenuManager;
