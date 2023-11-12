class EventManager {
  #benefitInfo;

  constructor(date) {
    this.#benefitInfo = {
      xmasDiscount: 0,
      specialdayDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      champagne: 0,
      badge: 0,
    };
    this.date = date;
  }

  getBenefitInfo() {
    return this.#benefitInfo;
  }

  calculateGuestBenefit(orderManager, menuManager) {
    this.#calculateXmasDiscount();
    this.#calculateSpecialdayDiscount();
    this.#calculateDecemberDiscount(orderManager, menuManager);
    this.#canGetChampagne(orderManager, menuManager);
    this.#canGetBadge();
  }

  calculateTotalDiscount() {
    let totalDiscount = 0;
    for (const benefit in this.#benefitInfo) {
      if (benefit !== 'badge') {
        totalDiscount += this.#benefitInfo[benefit];
      }
    }

    return totalDiscount;
  }

  #calculateXmasDiscount() {
    if (this.date <= 25) {
      this.#benefitInfo.xmasDiscount = 1000 + (this.date - 1) * 100;
    }
  }

  #calculateSpecialdayDiscount() {
    if ([3, 10, 17, 24, 25, 31].includes(this.date)) {
      this.#benefitInfo.specialdayDiscount = 1000;
    }
  }

  #calculateDecemberDiscount(orderManager, menuManager) {
    const orderList = orderManager.getOrderList();
    if (this.#getDayOfWeek() < 5) {
      const count = menuManager.countMenuType(orderList, 'dessert');
      this.#benefitInfo.weekdayDiscount = count * 2023;

      return;
    }

    const count = menuManager.countMenuType(orderList, 'main');
    this.#benefitInfo.weekendDiscount = count * 2023;
  }

  #canGetChampagne(orderManager, menuManager) {
    const totalPrice = orderManager.getTotalPrice(menuManager);
    if (totalPrice >= 120000) {
      this.#benefitInfo.champagne = 25000;
    }
  }

  #canGetBadge() {
    const totalDiscount = this.calculateTotalDiscount();
    if (totalDiscount >= 20000) {
      this.#benefitInfo.badge = '산타';
      return;
    }
    if (totalDiscount >= 10000) {
      this.#benefitInfo.badge = '트리';
      return;
    }
    if (totalDiscount >= 5000) {
      this.#benefitInfo.badge = '별';
    }
  }

  #getDayOfWeek() {
    return new Date(2023, 12 - 1, this.date).getDay();
  }
}

export default EventManager;
