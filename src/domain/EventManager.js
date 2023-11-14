import { UNIT, DATE, BADGES, BENEFIT_LIST } from '../constants/options.js';
import { MENU_TYPE } from '../constants/menu.js';

class EventManager {
  #benefitInfo;

  constructor(date) {
    this.#benefitInfo = {
      xmasDiscount: 0,
      specialdayDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      isChampagne: false,
      badge: '',
    };
    this.date = date;
  }

  getBenefitInfo() {
    return this.#benefitInfo;
  }

  canGetChampagne(totalPrice) {
    if (totalPrice >= UNIT.champagneThreshold) {
      this.#benefitInfo.isChampagne = true;
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
    const discountTarget = DATE.isWeekday(this.#getDayOfWeek())
      ? [BENEFIT_LIST.weekdayDiscount, MENU_TYPE.dessert]
      : [BENEFIT_LIST.weekendDiscount, MENU_TYPE.main];
    const count = menuManager.countMenuType(orderList, discountTarget[1]);
    this.#benefitInfo[discountTarget[0]] = count * UNIT.decemberDiscountAmount;
  }

  #getDayOfWeek() {
    return new Date(DATE.thisYear, DATE.thisMonth, this.date).getDay();
  }
}

export default EventManager;
