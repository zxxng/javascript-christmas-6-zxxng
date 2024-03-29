import { UNIT, DATE, BADGES, BENEFIT_LIST } from '../constants/options.js';

class EventManager {
  #date;
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
    this.#date = date;
  }

  getBenefitInfo() {
    return this.#benefitInfo;
  }

  getBenefitValue(key) {
    return this.#benefitInfo[key];
  }

  getTotalDiscount() {
    const benefitInfoValue = Object.values(this.#benefitInfo);

    return benefitInfoValue.reduce((total, value) => {
      return typeof value === 'number' ? total + value : total;
    }, 0);
  }

  getTotalBenefit() {
    return this.#benefitInfo.isChampagne
      ? this.getTotalDiscount() + UNIT.champagneDiscountAmount
      : this.getTotalDiscount();
  }

  calculateDiscountAndBenefit(orderManager) {
    this.#calculateXmasDiscount();
    this.#calculateSpecialdayDiscount();
    this.#calculateDecemberDiscount(orderManager);
    this.#canGetChampagne(orderManager);
    this.#canGetBadge();
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

  #calculateDecemberDiscount(orderManager) {
    const [discountDay, discountCategory] = DATE.isWeekday(this.#getDayOfWeek())
      ? [BENEFIT_LIST.weekdayDiscount, 'dessert']
      : [BENEFIT_LIST.weekendDiscount, 'main'];
    const totalQuantity = this.#calculateDiscountTotalQuantity(discountCategory, orderManager);
    this.#benefitInfo[discountDay] = totalQuantity * UNIT.decemberDiscountAmount;
  }

  #calculateDiscountTotalQuantity(discountCategory, orderManager) {
    const discountCategoryList = orderManager.filterItemsByProperty('category', discountCategory);

    return discountCategoryList.reduce((sum, order) => {
      const orderMenu = order.getOrderMenu();
      return sum + orderMenu.quantity;
    }, 0);
  }

  #canGetChampagne(orderManager) {
    const totalPrice = orderManager.getTotalPrice();
    if (totalPrice >= UNIT.champagneThreshold) {
      this.#benefitInfo.isChampagne = true;
    }
  }

  #canGetBadge() {
    const totalBenefit = this.getTotalBenefit();
    const badge = BADGES.find(({ discountedAmount }) => {
      return totalBenefit <= discountedAmount;
    });

    if (badge) {
      this.#benefitInfo.badge = badge.badge;
    }
  }

  #getDayOfWeek() {
    return new Date(DATE.thisYear, DATE.thisMonth, this.#date).getDay();
  }
}

export default EventManager;
