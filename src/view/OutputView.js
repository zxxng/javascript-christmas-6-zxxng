import { Console } from '@woowacourse/mission-utils';
import { TITLE_MESSAGE, BENEFIT_MESSAGE, TEXT_FORMAT } from '../constants/message.js';

const OutputView = (() => {
  const printAll = function (printFunctions) {
    printFunctions.forEach((runFunction, index) => {
      Console.print(TITLE_MESSAGE[index]);
      runFunction.call(this);
      Console.print(TEXT_FORMAT.newLine);
    });
  };

  const printOrderMenu = function () {
    this.orderList.forEach((order) => {
      Console.print(TEXT_FORMAT.orderMenu(order));
    });
  };

  const printBeforeTotalPrice = function () {
    const totalPrice = this.billManager.getTotalPrice();
    Console.print(TEXT_FORMAT.price(totalPrice));
  };

  const printGiftMenu = function () {
    Console.print(this.benefitInfo.isChampagne ? TEXT_FORMAT.giftMenu : TEXT_FORMAT.none);
  };

  const printBenefitList = function () {
    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => this.benefitInfo[benefit] && this.benefitInfo[benefit] !== 0
    );
    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ text, benefit }) =>
          Console.print(text(this.benefitInfo[benefit]))
        )
      : Console.print(TEXT_FORMAT.none);
  };

  const printTotalDiscount = function () {
    const totalDiscount = this.billManager.getTotalBenefit();
    Console.print(totalDiscount ? TEXT_FORMAT.price(totalDiscount) : TEXT_FORMAT.none);
  };

  const printEstimatedPayment = function () {
    const estimatedPayment = this.billManager.getEstimatedPayment();
    Console.print(TEXT_FORMAT.price(estimatedPayment));
  };

  const printEventBadge = function () {
    Console.print(this.benefitInfo.badge ? this.benefitInfo.badge : TEXT_FORMAT.none);
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
