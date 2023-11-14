import { UNIT, DATE, BADGES, BENEFIT_LIST } from '../constants/options.js';
import { CATEGORY } from '../constants/menu.js';

class EventManager {
  #benefitInfo;
  #date;

  constructor(date) {
    this.#benefitInfo = {
      xmasDiscount: 0,
      specialdayDiscount: 0,
      weekdayDiscount: 0,
      weekendDiscount: 0,
      isChampagne: false,
      badge: '',
    };
    this.#date = date;
  }

  getBenefitInfo() {
    return this.#benefitInfo;
  }

  canGetChampagne(billManager) {
    const totalPrice = billManager.getTotalPrice();
    if (totalPrice >= UNIT.champagneThreshold) {
      this.#benefitInfo.isChampagne = true;
    }
  }

  canGetBadge(billManager) {
    const totalBenefit = billManager.getTotalBenefit();
    const badge = BADGES.find(({ discountedAmount }) => totalBenefit <= discountedAmount);
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
    if (this.#date <= DATE.xmas) {
      this.#benefitInfo.xmasDiscount =
        UNIT.baseXmasDiscountAmount + (this.#date - 1) * UNIT.dailyXmasDiscountAmount;
    }
  }

  #calculateSpecialdayDiscount() {
    if (DATE.specialDays.includes(this.#date)) {
      this.#benefitInfo.specialdayDiscount = UNIT.specialdayDiscountAmount;
    }
  }

  #calculateDecemberDiscount(orderManager, menuManager) {
    const orderList = orderManager.getOrderList();
    const [discountDay, discountCategory] = DATE.isWeekday(this.#getDayOfWeek())
      ? [BENEFIT_LIST.weekdayDiscount, CATEGORY.dessert]
      : [BENEFIT_LIST.weekendDiscount, CATEGORY.main];
    const count = menuManager.countMenuCategory(orderList, discountCategory);
    this.#benefitInfo[discountDay] = count * UNIT.decemberDiscountAmount;
  }

  #getDayOfWeek() {
    return new Date(DATE.thisYear, DATE.thisMonth, this.#date).getDay();
  }
}

export default EventManager;
