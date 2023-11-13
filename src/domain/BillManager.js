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
        total + this.#menuManager.findProperty(order.menu, 'price') * order.quantity,
      0
    );
  }

  getTotalBenefit() {
    return this.#benefitInfo.champagne
      ? this.#getTotalDiscount() + 25000
      : this.#getTotalDiscount();
  }

  getEstimatedPayment() {
    console.log(`this.getTotalPrice(): ${this.getTotalPrice()}`);
    console.log(`this.getTotalDiscount(): ${this.#getTotalDiscount()}`);
    return this.getTotalPrice() - this.#getTotalDiscount();
  }

  #getTotalDiscount() {
    return Object.values(this.#benefitInfo).reduce(
      (total, value) => (typeof value === 'number' ? total + value : total),
      0
    );
  }
}

export default BillManager;
