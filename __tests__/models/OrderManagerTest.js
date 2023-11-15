import Order from '../../src/models/Order';
import OrderManager from '../../src/models/OrderManager';

describe('OrderList 클래스 테스트', () => {
  const orderInput = ['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1'];
  const orderList = new OrderManager(orderInput);
  test('OrderDetail 객체 배열로 반환되는지 확인한다.', () => {
    const result = orderList.getOrderList();
    expect(result.every((order) => order instanceof Order)).toBeTruthy();
  });

  test('메뉴를 한 번에 20개 넘게 주문하면 예외가 발생한다.', () => {
    const orderInput = ['양송이수프-12', '티본스테이크-6', '크리스마스파스타-6'];
    expect(() => new OrderManager(orderInput)).toThrow('ERROR');
  });

  test('중복메뉴가 있으면 예외가 발생한다.', () => {
    const orderInput = ['바비큐립-1', '바비큐립-1', '샴페인-1'];
    expect(() => new OrderManager(orderInput)).toThrow('ERROR');
  });

  test('음료만 주문 시 예외가 발생한다.', () => {
    const orderInput = ['제로콜라-1', '레드와인-1'];
    expect(() => new OrderManager(orderInput)).toThrow('ERROR');
  });
});
