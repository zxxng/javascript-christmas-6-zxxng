import { MENU_LIST } from '../constants/menu.js';
import { PROPERTY } from '../constants/options.js';

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

  findProperty(orderMenu, findProperty) {
    const menu = this.#menuList.find((menu) => menu.name === orderMenu);
    return menu[findProperty];
  }

  countMenuType(orderList, type) {
    return orderList.reduce(
      (count, order) =>
        this.findProperty(order.menu, PROPERTY.type) === type ? count + order.quantity : count,
      0
    );
  }
}

export default MenuManager;
