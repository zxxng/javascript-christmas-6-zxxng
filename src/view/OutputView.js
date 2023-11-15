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
      const orderMenu = order.getOrderMenu();
      Console.print(COMMON.orderMenu(orderMenu));
    });
  };

  const printTotalPrice = function () {
    Console.print(COMMON.price(this.orderManager.getTotalPrice()));
  };

  const printGiftMenu = function () {
    Console.print(this.benefitInfo.isChampagne ? GIFT_MENU : COMMON.none);
  };

  const printBenefit = function () {
    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => this.benefitInfo[benefit] && this.benefitInfo[benefit] !== 0
    );
    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ benefit, text }) =>
          Console.print(text(this.benefitInfo[benefit]))
        )
      : Console.print(COMMON.none);
  };

  const printTotalBenefit = function () {
    Console.print(COMMON.price(this.eventManager.getTotalBenefit()));
  };

  const printEstimatedPayment = function () {
    Console.print(COMMON.price(this.orderManager.getEstimatedPayment(this.eventManager)));
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
        printTotalBenefit,
        printEstimatedPayment,
        printEventBadge,
      ]);
    },
  };
})();

export default OutputView;
