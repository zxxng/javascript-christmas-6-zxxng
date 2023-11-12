import { Console } from '@woowacourse/mission-utils';
import { TITLE_MESSAGE, BENEFIT_MESSAGE, OUTPUT_FORMAT } from '../constants/messege.js';

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
    if (champagne) {
      Console.print(OUTPUT_FORMAT.giftMenu);
      Console.print('');
      return;
    }
    Console.print(OUTPUT_FORMAT.none);
    Console.print('');
  },

  printBenefitList(benefitInfo) {
    Console.print(TITLE_MESSAGE.benefitList);
    let isPrinted = false;
    BENEFIT_MESSAGE.forEach((message) => {
      if (benefitInfo[message.benefit]) {
        Console.print(message.text + OUTPUT_FORMAT.price(benefitInfo[message.benefit]));
        isPrinted = true;
      }
    });
    if (!isPrinted) {
      Console.print(OUTPUT_FORMAT.none);
    }
    Console.print('');
  },

  printTotalDiscount(totalDiscount) {
    Console.print(TITLE_MESSAGE.totalDiscount);
    if (totalDiscount) {
      Console.print(OUTPUT_FORMAT.price(totalDiscount));
      Console.print('');
      return;
    }
    Console.print(OUTPUT_FORMAT.none);
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
    if (badge) {
      Console.print(badge);
      Console.print('');
      return;
    }
    Console.print(OUTPUT_FORMAT.none);
    Console.print('');
  },
};

export default OutputView;
