class EventManager {
  #benefit;

  constructor(date) {
    this.#benefit = {
      xmasDiscount: this.calculateXmasDiscount(date),
      specialdayDiscount: this.calculateSpecialdayDiscount(date),
      weekdayDiscount: 0,
      weekendDiscount: 0,
      champagne: 0,
      badge: '',
    };
    this.date = date;
  }

  getBenefit() {
    return this.#benefit;
  }

  calculateXmasDiscount(date) {
    if (date <= 25) return 1000 + (date - 1) * 100;
    return 0;
  }

  calculateSpecialdayDiscount(date) {
    if ([3, 10, 17, 24, 25, 31].includes(date)) return 1000;
    return 0;
  }

  calculateDecemberDiscount(orderManager, menuManager) {
    const orderList = orderManager.getMenuList();
    if (this.getDayOfWeek() < 5) {
      const count = menuManager.countMenuType(orderList, 'dessert');
      this.#benefit.weekdayDiscount = count * 2023;

      return;
    }

    const count = menuManager.countMenuType(orderList, 'main');
    this.#benefit.weekendDiscount = count * 2023;
  }

  getDayOfWeek() {
    return new Date(2023, 12 - 1, this.date).getDay();
  }
}

export default EventManager;
