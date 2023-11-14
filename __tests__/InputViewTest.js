import { Console } from '@woowacourse/mission-utils';
import InputView from '../src/view/InputView';
import REGEXS from '../src/constants/regexs';

const mockQuestions = (input) => {
  Console.readLineAsync = jest.fn().mockResolvedValue(input);
};

describe('InputView 테스트', () => {
  const validDate = ['1', '31'];
  test.each(validDate)('date가 유효할 때 값을 반환하는지 확인한다.', async (date) => {
    mockQuestions(date);
    expect(await InputView.readDate()).toBe(Number(date));
  });

  const invalidDate = ['1일', '12/1', '12월1일', '-2', '45'];
  test.each(invalidDate)('date가 유효하지 않을때 예외가 발생하는지 확인한다.', async (date) => {
    mockQuestions(date);
    await expect(InputView.readDate()).rejects.toThrow('[ERROR]');
  });

  const validOrder = [
    '타파스-1,제로콜라-1',
    '타파스-1, 초코케이크-2, 제로콜라-1',
    '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1',
  ];
  const date = 10;
  test.each(validOrder)('order가 유효할 때 값을 반환하는지 확인한다.', async (order) => {
    mockQuestions(order);
    expect(await InputView.readOrder(date)).toEqual(order.split(REGEXS.commaAndOptionalSpace));
  });

  const invalidOrder = [
    '타파스-1개,제로콜라-1',
    '티본스테이크-0',
    '타파스-1개 제로콜라-1',
    '티본스테이크1,바비큐립1,초코케이크2,제로콜라1',
  ];
  test.each(invalidOrder)('order가 유효하지 않을때 예외가 발생하는지 확인한다.', async (order) => {
    mockQuestions(order);
    await expect(InputView.readOrder()).rejects.toThrow('[ERROR]');
  });
});
