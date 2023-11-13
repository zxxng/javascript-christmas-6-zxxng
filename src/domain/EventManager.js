import { UNIT, DATE, BADGES } from '../constants/options.js';
import { MENU_TYPE } from '../constants/menu.js';

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
    if (totalPrice >= UNIT.champagneThreshold) {
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
    if (this.date <= DATE.xmas) {
      this.#benefitInfo.xmasDiscount =
        UNIT.baseXmasDiscountAmount + (this.date - 1) * UNIT.dailyXmasDiscountAmount;
    }
  }

  #calculateSpecialdayDiscount() {
    if (DATE.specialDays.includes(this.date)) {
      this.#benefitInfo.specialdayDiscount = 1000;
    }
  }

  #calculateDecemberDiscount(orderManager, menuManager) {
    const orderList = orderManager.getOrderList();
    if (DATE.isWeekday(this.#getDayOfWeek())) {
      const count = menuManager.countMenuType(orderList, MENU_TYPE.dessert);
      this.#benefitInfo.weekdayDiscount = count * UNIT.decemberDiscountAmount;

      return;
    }

    const count = menuManager.countMenuType(orderList, MENU_TYPE.main);
    this.#benefitInfo.weekendDiscount = count * UNIT.decemberDiscountAmount;
  }

  #getDayOfWeek() {
    return new Date(DATE.thisYear, DATE.thisMonth, this.date).getDay();
  }
}

export default EventManager;
