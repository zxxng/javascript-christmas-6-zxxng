import { Console } from '@woowacourse/mission-utils';
import { TITLE_MESSAGE, BENEFIT_MESSAGE, OUTPUT_FORMAT } from '../constants/message.js';

const OutputView = {
  printMenu(orderManager, eventManager, billManager) {
    this.orderList = orderManager.getOrderList();
    this.benefitInfo = eventManager.getBenefitInfo();
    this.billManager = billManager;

    this.printOrderMenu();
    this.printBeforeTotalPrice();
    this.printGiftMenu();
    this.printBenefitList();
    this.printTotalDiscount();
    this.printEstimatedPayment();
    this.printEventBadge();
  },

  printOrderMenu() {
    Console.print(TITLE_MESSAGE.orderMenu);

    this.orderList.forEach((order) => {
      Console.print(OUTPUT_FORMAT.orderMenu(order));
    });
    Console.print('');
  },

  printBeforeTotalPrice() {
    const totalPrice = this.billManager.getTotalPrice();
    Console.print(TITLE_MESSAGE.beforeTotalPrice);

    Console.print(OUTPUT_FORMAT.price(totalPrice));
    Console.print('');
  },

  printGiftMenu() {
    Console.print(TITLE_MESSAGE.giftMenu);

    Console.print(this.benefitInfo.champagne ? OUTPUT_FORMAT.giftMenu : OUTPUT_FORMAT.none);
    Console.print('');
  },

  printBenefitList() {
    Console.print(TITLE_MESSAGE.benefitList);

    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => this.benefitInfo[benefit] && this.benefitInfo[benefit] !== 0
    );

    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ text, benefit }) =>
          Console.print(text(this.benefitInfo[benefit]))
        )
      : Console.print(OUTPUT_FORMAT.none);
    Console.print('');
  },

  printTotalDiscount() {
    const totalDiscount = this.billManager.getTotalBenefit();
    Console.print(TITLE_MESSAGE.totalDiscount);
    Console.print(totalDiscount ? OUTPUT_FORMAT.price(totalDiscount) : OUTPUT_FORMAT.none);
    Console.print('');
  },

  printEstimatedPayment() {
    const estimatedPayment = this.billManager.getEstimatedPayment();
    Console.print(TITLE_MESSAGE.estimatedPayment);
    Console.print(OUTPUT_FORMAT.price(estimatedPayment));
    Console.print('');
  },

  printEventBadge() {
    Console.print(TITLE_MESSAGE.eventBadge);
    Console.print(this.badge ? this.badge : OUTPUT_FORMAT.none);
    Console.print('');
  },
};

export default OutputView;
