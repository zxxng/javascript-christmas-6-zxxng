class EventManager {
  #benefitInfo;

  constructor(date) {
    this.#benefitInfo = {
      xmasDiscount: 0,
      specialdayDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      champagne: 0,
      badge: '',
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
    return Object.values(this.#benefitInfo).reduce(
      (total, value) => (typeof value === 'number' ? total + value : total),
      0
    );
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
    const badges = [
      { min: 20000, badge: '산타' },
      { min: 10000, badge: '트리' },
      { min: 5000, badge: '별' },
    ];
    const badge = badges.find(({ min }) => totalDiscount >= min);
    if (badge) {
      this.#benefitInfo.badge = badge.badge;
    }
  }

  #getDayOfWeek() {
    return new Date(2023, 12 - 1, this.date).getDay();
  }
}

export default EventManager;
