import { Console } from '@woowacourse/mission-utils';
import { TITLE, GIFT_MENU, COMMON, BENEFIT_MESSAGE } from '../constants/orderDetails.js';

const OutputView = (() => {
  const printAll = function (printFunctions) {
    printFunctions.forEach((runFunction, index) => {
      Console.print(TITLE[index]);
      runFunction.call(this);
      Console.print(COMMON.newLine);
    });
  };

  const printOrderMenu = function () {
    this.orderList.forEach((order) => {
      Console.print(COMMON.orderMenu(order));
    });
  };

  const printBeforeTotalPrice = function () {
    const totalPrice = this.billManager.getTotalPrice();
    Console.print(COMMON.price(totalPrice));
  };

  const printGiftMenu = function () {
    Console.print(this.benefitInfo.isChampagne ? GIFT_MENU : COMMON.none);
  };

  const printBenefitList = function () {
    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => this.benefitInfo[benefit] && this.benefitInfo[benefit] !== 0
    );
    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ text, benefit }) =>
          Console.print(text(this.benefitInfo[benefit]))
        )
      : Console.print(COMMON.none);
  };

  const printTotalDiscount = function () {
    const totalDiscount = this.billManager.getTotalBenefit();
    Console.print(totalDiscount ? COMMON.price(totalDiscount) : COMMON.none);
  };

  const printEstimatedPayment = function () {
    const estimatedPayment = this.billManager.getEstimatedPayment();
    Console.print(COMMON.price(estimatedPayment));
  };

  const printEventBadge = function () {
    Console.print(this.benefitInfo.badge ? this.benefitInfo.badge : COMMON.none);
  };

  return {
    printMenu(orderManager, eventManager, billManager) {
      this.orderList = orderManager.getOrderList();
      this.benefitInfo = eventManager.getBenefitInfo();
      this.billManager = billManager;

      printAll.call(this, [
        printOrderMenu,
        printBeforeTotalPrice,
        printGiftMenu,
        printBenefitList,
        printTotalDiscount,
        printEstimatedPayment,
        printEventBadge,
      ]);
    },
  };
})();

export default OutputView;
