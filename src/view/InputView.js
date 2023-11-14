import { Console } from '@woowacourse/mission-utils';
import { WOOTECO_MESSAGE, INPUT_MESSAGE, ERROR_MESSAGE } from '../constants/messages.js';
import { DATE } from '../constants/options.js';
import REGEXS from '../constants/regexs.js';

const InputView = (() => {
  const validateDateInput = function (dateInput) {
    if (!REGEXS.number.test(dateInput)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }

    if (isNotWithinDateRange(Number(dateInput))) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  };

  const isNotWithinDateRange = function (date) {
    return date < DATE.minDate || date > DATE.maxDate;
  };

  const validateOrderInput = function (orderInput) {
    if (REGEXS.specialCharacter.test(orderInput)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }

    const orderList = orderInput.split(REGEXS.commaAndOptionalSpace);
    orderList.forEach((order) => {
      const [menu, quantity] = order.split('-');
      if (isInvalidQuantity(quantity)) {
        throw new Error(ERROR_MESSAGE.invalidOrder);
      }
    });
  };

  const isInvalidQuantity = function (quantity) {
    return !quantity || !REGEXS.number.test(quantity) || !Number(quantity);
  };

  const trimReadLineAsync = async function (promptMessage) {
    const input = await Console.readLineAsync(promptMessage);

    return input.trim();
  };

  return {
    async readDate() {
      Console.print(WOOTECO_MESSAGE.introduce);
      const input = await trimReadLineAsync(INPUT_MESSAGE.askReservationDate);
      validateDateInput(input);

      return Number(input);
    },

    async readOrder(date) {
      const input = await trimReadLineAsync(INPUT_MESSAGE.askMenuAndCount);
      validateOrderInput(input);
      Console.print(WOOTECO_MESSAGE.benefitsPreview(date));

      return input.split(REGEXS.commaAndOptionalSpace);
    },
  };
})();

export default InputView;
