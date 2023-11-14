import { Console } from '@woowacourse/mission-utils';
import { TITLE_MESSAGE, BENEFIT_MESSAGE, TEXT_FORMAT } from '../constants/message.js';

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
      Console.print(TEXT_FORMAT.orderMenu(order));
    });
    Console.print('');
  },

  printBeforeTotalPrice() {
    Console.print(TITLE_MESSAGE.beforeTotalPrice);
    const totalPrice = this.billManager.getTotalPrice();
    Console.print(TEXT_FORMAT.price(totalPrice));
    Console.print('');
  },

  printGiftMenu() {
    Console.print(TITLE_MESSAGE.giftMenu);
    Console.print(this.benefitInfo.isChampagne ? TEXT_FORMAT.giftMenu : TEXT_FORMAT.none);
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
      : Console.print(TEXT_FORMAT.none);
    Console.print('');
  },

  printTotalDiscount() {
    Console.print(TITLE_MESSAGE.totalDiscount);
    const totalDiscount = this.billManager.getTotalBenefit();
    Console.print(totalDiscount ? TEXT_FORMAT.price(totalDiscount) : TEXT_FORMAT.none);
    Console.print('');
  },

  printEstimatedPayment() {
    Console.print(TITLE_MESSAGE.estimatedPayment);
    const estimatedPayment = this.billManager.getEstimatedPayment();
    Console.print(TEXT_FORMAT.price(estimatedPayment));
    Console.print('');
  },

  printEventBadge() {
    Console.print(TITLE_MESSAGE.eventBadge);
    Console.print(this.benefitInfo.badge ? this.benefitInfo.badge : TEXT_FORMAT.none);
    Console.print('');
  },
};

export default OutputView;
