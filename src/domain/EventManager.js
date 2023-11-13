import { BADGES } from '../constants/options';

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

  canGetChampagne(totalPrice) {
    if (totalPrice >= 120000) {
      this.#benefitInfo.champagne = '샴페인 1개';
    }
  }

  canGetBadge(totalDiscount) {
    const badge = BADGES.find(({ min }) => totalDiscount >= min);
    if (badge) {
      this.#benefitInfo.badge = badge.badge;
    }
  }

  calculateDiscount(orderManager, menuManager) {
    this.#calculateXmasDiscount();
    this.#calculateSpecialdayDiscount();
    this.#calculateDecemberDiscount(orderManager, menuManager);
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

  #getDayOfWeek() {
    return new Date(2023, 12 - 1, this.date).getDay();
  }
}

export default EventManager;
