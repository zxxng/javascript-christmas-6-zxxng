class DiscountManager {
  #discountAmount;

  constructor(date) {
    this.#discountAmount = {
      xmasDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      specialdayDiscount: 0,
    };
    this.date = date;
  }

  getDiscountAmout() {
    return this.#discountAmount;
  }

  calculateXmasDiscount() {
    if (this.date <= 25) {
      this.#discountAmount.xmasDiscount = 1000 + (this.date - 1) * 100;
    }
  }

  calculateSpecialdayDiscount() {
    if ([3, 10, 17, 24, 25, 31].includes(this.date)) {
      this.#discountAmount.specialdayDiscount = 1000;
    }
  }

  calculateDecemberDiscount(orderManager, menuManager) {
    const orderList = orderManager.getMenuList();
    if (this.getDayOfWeek() < 5) {
      const count = menuManager.countMenuType(orderList, 'dessert');
      this.#discountAmount.weekdayDiscount = count * 2023;

      return;
    }

    const count = menuManager.countMenuType(orderList, 'main');
    this.#discountAmount.weekendDiscount = count * 2023;
  }

  getDayOfWeek() {
    return new Date(2023, 12 - 1, this.date).getDay();
  }
}

export default DiscountManager;
