import { Console } from '@woowacourse/mission-utils';
import { WOOTECO_MESSAGE, INPUT_MESSAGE, ERROR_MESSAGE } from '../constants/message.js';
import REGEXS from '../constants/regexs.js';

const InputView = {
  async readDate() {
    Console.print(WOOTECO_MESSAGE.introduce);
    const input = await Console.readLineAsync(INPUT_MESSAGE.askReservationDate);
    this.validateDateInput(input.trim());

    return Number(input.trim());
  },

  validateDateInput(dateInput) {
    if (!REGEXS.number.test(dateInput)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
    if (Number(dateInput) < 1 || Number(dateInput) > 31) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  },

  async readOrder(date) {
    const input = await Console.readLineAsync(INPUT_MESSAGE.askMenuAndCount);
    this.validateOrderInput(input);
    Console.print(WOOTECO_MESSAGE.benefitsPreview(date));

    return input.trim().split(REGEXS.commaAndOptionalSpace);
  },

  validateOrderInput(orderInput) {
    if (REGEXS.specialCharacter.test(orderInput)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }

    const orderList = orderInput.trim().split(REGEXS.commaAndOptionalSpace);
    orderList.forEach((order) => {
      const [menu, quantity] = order.split('-');
      if (!quantity || !REGEXS.number.test(quantity) || !Number(quantity)) {
        throw new Error(ERROR_MESSAGE.invalidOrder);
      }
    });
  },
};

export default InputView;
