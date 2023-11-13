import { Console } from '@woowacourse/mission-utils';
import { TITLE_MESSAGE, BENEFIT_MESSAGE, OUTPUT_FORMAT } from '../constants/message.js';

const OutputView = {
  printMenu(orderManager, eventManager, menuManager) {
    const orderList = orderManager.getOrderList();
    const benefitInfo = eventManager.getBenefitInfo();
    const totalPrice = orderManager.getTotalPrice(menuManager);
    const totalDiscount = eventManager.calculateTotalDiscount();

    this.printOrderMenu(orderList);
    this.printBeforeTotalPrice(totalPrice);
    this.printGiftMenu(benefitInfo.champagne);
    this.printBenefitList(benefitInfo);
    this.printTotalDiscount(totalDiscount);
    this.printEstimatedPayment(totalPrice, totalDiscount, benefitInfo.champagne);
    this.printEventBadge(benefitInfo.badge);
  },

  printOrderMenu(orderList) {
    Console.print(TITLE_MESSAGE.orderMenu);

    orderList.forEach((order) => {
      Console.print(OUTPUT_FORMAT.orderMenu(order));
    });
    Console.print('');
  },

  printBeforeTotalPrice(totalPrice) {
    Console.print(TITLE_MESSAGE.beforeTotalPrice);

    Console.print(OUTPUT_FORMAT.price(totalPrice));
    Console.print('');
  },

  printGiftMenu(champagne) {
    Console.print(TITLE_MESSAGE.giftMenu);

    Console.print(champagne ? OUTPUT_FORMAT.giftMenu : OUTPUT_FORMAT.none);
    Console.print('');
  },

  printBenefitList(benefitInfo) {
    Console.print(TITLE_MESSAGE.benefitList);

    const benefitsToPrint = BENEFIT_MESSAGE.filter(
      ({ benefit }) => benefitInfo[benefit] && benefitInfo[benefit] !== 0
    );

    benefitsToPrint.length
      ? benefitsToPrint.forEach(({ text, benefit }) => Console.print(text(benefitInfo[benefit])))
      : Console.print(OUTPUT_FORMAT.none);
    Console.print('');
  },

  printTotalDiscount(totalDiscount) {
    Console.print(TITLE_MESSAGE.totalDiscount);

    Console.print(totalDiscount ? OUTPUT_FORMAT.price(totalDiscount) : OUTPUT_FORMAT.none);
    Console.print('');
  },

  printEstimatedPayment(totalPrice, totalDiscount, champagne) {
    Console.print(TITLE_MESSAGE.estimatedPayment);
    let estimatedPayment = totalPrice - totalDiscount;
    if (champagne) estimatedPayment += 25000;
    Console.print(OUTPUT_FORMAT.price(estimatedPayment));
    Console.print('');
  },

  printEventBadge(badge) {
    Console.print(TITLE_MESSAGE.eventBadge);
    Console.print(badge ? badge : OUTPUT_FORMAT.none);
    Console.print('');
  },
};

export default OutputView;
