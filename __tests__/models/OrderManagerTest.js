import Order from '../../src/models/Order';
import OrderManager from '../../src/models/OrderManager';
import { MAIN, DESSERT, BEVERAGE } from '../../src/constants/menu';

const mockEventManager = {
  getTotalDiscount: jest.fn(),
};

const createOrderManager = (orderInput) => {
  return new OrderManager(orderInput.map((order) => new Order(order.split('-'))));
};

describe('OrderManager 클래스 테스트', () => {
  const orderInput = ['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1'];
  const orderManager = createOrderManager(orderInput);

  test('주문 목록의 총 가격을 계산한다.', () => {
    const expectedTotalPrice =
      MAIN.티본스테이크 + MAIN.바비큐립 + DESSERT.초코케이크 * 2 + BEVERAGE.제로콜라;
    expect(orderManager.getTotalPrice()).toBe(expectedTotalPrice);
  });

  test('할인 후 예상 결제금액을 계산한다.', () => {
    const totalDiscount = -20000;
    mockEventManager.getTotalDiscount.mockReturnValue(totalDiscount);

    const expectedPayment = orderManager.getTotalPrice() + totalDiscount;
    expect(orderManager.getEstimatedPayment(mockEventManager)).toBe(expectedPayment);
  });

  test('메뉴를 한 번에 20개 넘게 주문하면 예외가 발생한다.', () => {
    const orderInput = ['양송이수프-12', '티본스테이크-6', '크리스마스파스타-6'];
    expect(() => createOrderManager(orderInput)).toThrow('ERROR');
  });

  test('중복메뉴가 있으면 예외가 발생한다.', () => {
    const orderInput = ['바비큐립-1', '바비큐립-1', '샴페인-1'];
    expect(() => createOrderManager(orderInput)).toThrow('ERROR');
  });

  test('음료만 주문 시 예외가 발생한다.', () => {
    const orderInput = ['제로콜라-1', '레드와인-1'];
    expect(() => createOrderManager(orderInput)).toThrow('ERROR');
  });
});
