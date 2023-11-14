import { UNIT } from '../constants/options.js';
import { PROPERTY } from '../constants/options.js';

class BillManager {
  #orderList;
  #benefitInfo;
  #menuManager;

  constructor(orderManager, eventManager, menuManager) {
    this.#orderList = orderManager.getOrderList();
    this.#benefitInfo = eventManager.getBenefitInfo();
    this.#menuManager = menuManager;
  }

  getTotalPrice() {
    return this.#orderList.reduce(
      (total, order) =>
        total + this.#menuManager.findProperty(order.menu, PROPERTY.price) * order.quantity,
      0
    );
  }

  getTotalBenefit() {
    return this.#benefitInfo.isChampagne
      ? this.#getTotalDiscount() + UNIT.champagneDiscountAmount
      : this.#getTotalDiscount();
  }

  getEstimatedPayment() {
    return this.getTotalPrice() + this.#getTotalDiscount();
  }

  #getTotalDiscount() {
    return Object.values(this.#benefitInfo).reduce(
      (total, value) => (typeof value === 'number' ? total + value : total),
      0
    );
  }
}

export default BillManager;
