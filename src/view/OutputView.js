import { Console } from '@woowacourse/mission-utils';
import { TITLE, GIFT_MENU, COMMON, BENEFIT_MESSAGE } from '../constants/orderDetails.js';
import { BENEFIT_LIST } from '../constants/options.js';

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
    const isChampagne = this.eventManager.getBenefitValue(BENEFIT_LIST.isChampagne);
    Console.print(isChampagne ? GIFT_MENU : COMMON.none);
  };

  const printBenefit = function () {
    const benefitsToPrint = BENEFIT_MESSAGE.filter(({ benefit }) => {
      const benefitValue = this.eventManager.getBenefitValue(benefit);
      return benefitValue && benefitValue !== 0;
    });
    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ benefit, text }) => {
          Console.print(text(this.eventManager.getBenefitValue(benefit)));
        })
      : Console.print(COMMON.none);
  };

  const printTotalBenefit = function () {
    Console.print(COMMON.price(this.eventManager.getTotalBenefit()));
  };

  const printEstimatedPayment = function () {
    Console.print(COMMON.price(this.orderManager.getEstimatedPayment(this.eventManager)));
  };

  const printEventBadge = function () {
    const eventBadge = this.eventManager.getBenefitValue(BENEFIT_LIST.badge);
    Console.print(eventBadge ? eventBadge : COMMON.none);
  };

  const printFunctions = [
    printMenu,
    printTotalPrice,
    printGiftMenu,
    printBenefit,
    printTotalBenefit,
    printEstimatedPayment,
    printEventBadge,
  ];

  return {
    printResult(orderManager, eventManager) {
      this.orderManager = orderManager;
      this.eventManager = eventManager;

      printAll.call(this, printFunctions);
    },
  };
})();

export default OutputView;
