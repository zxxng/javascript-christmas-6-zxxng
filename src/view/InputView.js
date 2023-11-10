import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE, ERROR_MESSEGE } from '../constants/Message';
import REGEXS from '../constants/regexs';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.askReservationDate);
    this.validateDateInput(input);

    return Number(input);
  },

  validateDateInput(dateInput) {
    if (!REGEXS.number.test(dateInput)) {
      throw new Error(ERROR_MESSEGE.nonNumericInput);
    }
    if (1 < Number(dateInput) && Number(dateInput) > 31) {
      throw new Error(ERROR_MESSEGE.invalidDate);
    }
  },

  async readOrder() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.askMenuAndCount);
    this.validateOrderInput(input);

    return input.split(REGEXS.commaAndOptionalSpace);
  },

  validateOrderInput(orderInput) {
    if (REGEXS.specialCharacter.test(orderInput)) {
      throw new Error(ERROR_MESSEGE.nonSpecialCharacterInput);
    }

    const orderList = orderInput.split(REGEXS.commaAndOptionalSpace);
    orderList.forEach((order) => {
      const orderDetail = order.split('-');
      if (!orderDetail[1] || !REGEXS.number.test(orderDetail[1])) {
        throw new Error(ERROR_MESSEGE.invalidOrder);
      }
    });
  },
};

export default InputView;
