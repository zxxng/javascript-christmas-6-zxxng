import { Console } from '@woowacourse/mission-utils';
import { WOOTECO_MESSAGE, INPUT_MESSAGE, ERROR_MESSAGE } from '../constants/messages.js';
import { DATE } from '../constants/options.js';
import REGEXS from '../constants/regexs.js';

const InputView = (() => {
  const validateDateInput = function (dateInput) {
    if (!REGEXS.number.test(dateInput)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
    if (Number(dateInput) < DATE.minDate || Number(dateInput) > DATE.maxDate) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  };

  const validateOrderInput = function (orderInput) {
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
  };

  return {
    async readDate() {
      Console.print(WOOTECO_MESSAGE.introduce);
      const input = await Console.readLineAsync(INPUT_MESSAGE.askReservationDate);
      validateDateInput(input.trim());

      return Number(input.trim());
    },

    async readOrder(date) {
      const input = await Console.readLineAsync(INPUT_MESSAGE.askMenuAndCount);
      validateOrderInput(input);
      Console.print(WOOTECO_MESSAGE.benefitsPreview(date));

      return input.trim().split(REGEXS.commaAndOptionalSpace);
    },
  };
})();

export default InputView;
