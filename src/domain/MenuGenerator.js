import { MENU_LIST } from '../constants/menu';
import { ERROR_MESSEGE } from '../constants/messege';

class MenuGenerator {
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

  validateMenu(orderList) {
    this.#containsInvalidMenuName(orderList);
    this.#hasOnlyBeverages(orderList);
  }

  #containsInvalidMenuName(orderList) {
    const menuNames = this.#menuList.map((menu) => menu.name);
    orderList.forEach((order) => {
      if (!menuNames.includes(order.menu)) {
        throw new Error(ERROR_MESSEGE.invalidOrder);
      }
    });
  }

  #hasOnlyBeverages(orderList) {
    const isBeverage = true;
    orderList.forEach((order) => {
      if (this.#findOrderType(order.menu) !== 'beverage') {
        isBeverage = false;
      }
    });

    if (isBeverage) {
      throw new Error(ERROR_MESSEGE.invalidOrder);
    }
  }

  #findOrderType(orderMenu) {
    const menu = this.#menuList.find((menu) => menu.name === orderMenu);
    return menu.type;
  }
}

export default MenuGenerator;
