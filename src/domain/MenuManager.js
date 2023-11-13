import { MENU_LIST } from '../constants/menu.js';

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
    return orderList.reduce(
      (total, order) => total + this.findProperty(order.menu, 'price') * order.quantity,
      0
    );
  }

  countMenuType(orderList, type) {
    return orderList.reduce(
      (count, order) =>
        this.findProperty(order.menu, 'type') === type ? count + order.quantity : count,
      0
    );
  }

  findProperty(orderMenu, findProperty) {
    const menu = this.#menuList.find((menu) => menu.name === orderMenu);
    return menu[findProperty];
  }
}

export default MenuManager;
