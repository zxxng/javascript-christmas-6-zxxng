import { Console } from '@woowacourse/mission-utils';
import { TITLE_MESSAGE, BENEFIT_MESSAGE, TEXT_FORMAT } from '../constants/message.js';

const OutputView = {
  printMenu(orderManager, eventManager, billManager) {
    this.orderList = orderManager.getOrderList();
    this.benefitInfo = eventManager.getBenefitInfo();
    this.billManager = billManager;

    this.printAll([
      this.printOrderMenu,
      this.printBeforeTotalPrice,
      this.printGiftMenu,
      this.printBenefitList,
      this.printTotalDiscount,
      this.printEstimatedPayment,
      this.printEventBadge,
    ]);
  },

  printAll(printFunctions) {
    printFunctions.forEach((runFunction, index) => {
      Console.print(TITLE_MESSAGE[index]);
      runFunction.call(this);
      Console.print(TEXT_FORMAT.newLine);
    });
  },

  printOrderMenu() {
    this.orderList.forEach((order) => {
      Console.print(TEXT_FORMAT.orderMenu(order));
    });
  },

  printBeforeTotalPrice() {
    const totalPrice = this.billManager.getTotalPrice();
    Console.print(TEXT_FORMAT.price(totalPrice));
  },

  printGiftMenu() {
    Console.print(this.benefitInfo.isChampagne ? TEXT_FORMAT.giftMenu : TEXT_FORMAT.none);
  },

  printBenefitList() {
    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => this.benefitInfo[benefit] && this.benefitInfo[benefit] !== 0
    );
    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ text, benefit }) =>
          Console.print(text(this.benefitInfo[benefit]))
        )
      : Console.print(TEXT_FORMAT.none);
  },

  printTotalDiscount() {
    const totalDiscount = this.billManager.getTotalBenefit();
    Console.print(totalDiscount ? TEXT_FORMAT.price(totalDiscount) : TEXT_FORMAT.none);
  },

  printEstimatedPayment() {
    const estimatedPayment = this.billManager.getEstimatedPayment();
    Console.print(TEXT_FORMAT.price(estimatedPayment));
  },

  printEventBadge() {
    Console.print(this.benefitInfo.badge ? this.benefitInfo.badge : TEXT_FORMAT.none);
  },
};

export default OutputView;
