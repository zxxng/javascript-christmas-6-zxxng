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
      this.#addMenuItems(menuItem.list, menuItem.category);
    });
  }

  #addMenuItems(list, category) {
    list.forEach(([name, price]) => {
      this.#menuList.push({
        category: category,
        name: name,
        price: price,
      });
    });
  }

  findProperty(orderMenu, findProperty) {
    const menu = this.#menuList.find((menu) => menu.name === orderMenu);
    return menu[findProperty];
  }

  countMenuCategory(orderList, category) {
    return orderList.reduce((count, order) => {
      if (this.findProperty(order.menu, PROPERTY.category) === category) {
        count + order.quantity;
      }
    }, 0);
  }
}

export default MenuManager;
