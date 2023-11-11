import { MENU_LIST } from '../constants/menu';

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
}

export default MenuGenerator;
