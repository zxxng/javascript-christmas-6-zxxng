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
};

export default InputView;
