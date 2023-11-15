import { Console } from '@woowacourse/mission-utils';
import { TITLE, GIFT_MENU, COMMON, BENEFIT_MESSAGE } from '../constants/orderDetails.js';

const OutputView = (() => {
  const printAll = function (printFunctions) {
    printFunctions.forEach((runFunction, index) => {
      Console.print(TITLE[index]);
      runFunction.call(this);
    });
  };

  const printMenu = function () {
    this.orderManager.getOrderList().forEach((order) => {
      const orderDetail = order.getOrderDetail();
      Console.print(COMMON.orderMenu(orderDetail));
    });
  };

  const printTotalPrice = function () {
    const totalPrice = this.orderManager.getTotalPrice();
    Console.print(COMMON.price(totalPrice));
  };

  const printGiftMenu = function () {
    Console.print(this.benefitInfo.isChampagne ? GIFT_MENU : COMMON.none);
  };

  const printBenefit = function () {
    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => this.benefitInfo[benefit] && this.benefitInfo[benefit] !== 0
    );
    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ text, benefit }) =>
          Console.print(text(this.benefitInfo[benefit]))
        )
      : Console.print(COMMON.none);
  };
  //
  const printTotalDiscount = function () {
    const totalDiscount = this.eventManager.getTotalBenefit();
    Console.print(totalDiscount ? COMMON.price(totalDiscount) : COMMON.none);
  };

  const printEstimatedPayment = function () {
    const estimatedPayment = this.orderManager.getEstimatedPayment(this.eventManager);
    Console.print(COMMON.price(estimatedPayment));
  };

  const printEventBadge = function () {
    Console.print(this.benefitInfo.badge ? this.benefitInfo.badge : COMMON.none);
  };

  return {
    printResult(orderManager, eventManager) {
      this.orderManager = orderManager;
      this.eventManager = eventManager;
      this.benefitInfo = this.eventManager.getBenefitInfo();

      printAll.call(this, [
        printMenu,
        printTotalPrice,
        printGiftMenu,
        printBenefit,
        printTotalDiscount,
        printEstimatedPayment,
        printEventBadge,
      ]);
    },
  };
})();

export default OutputView;
