import OrderManager from '../../src/models/OrderManager';
import MenuManager from '../../src/models/MenuManager';

const menuManager = new MenuManager();

describe('OrderManager 클래스 테스트', () => {
  const order = ['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1'];
  const orderManager = new OrderManager(order, menuManager);
  test('메뉴와 수량으로 구분된 객체로 반환되는지 확인한다.', () => {
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];
    expect(orderManager.getOrderList()).toEqual(orderList);
  });

  test('메뉴를 한 번에 20개 넘게 주문하면 예외가 발생한다.', () => {
    const order = ['양송이수프-12', '티본스테이크-6', '크리스마스파스타-6'];
    expect(() => {
      new OrderManager(order, menuManager);
    }).toThrow('ERROR');
  });

  test('중복메뉴가 있으면 예외가 발생한다.', () => {
    const order = ['바비큐립-1', '바비큐립-1', '샴페인-1'];
    expect(() => {
      new OrderManager(order, menuManager);
    }).toThrow('ERROR');
  });

  test('음료만 주문 시 예외가 발생한다.', () => {
    const order = ['제로콜라-1', '레드와인-1'];
    expect(() => {
      new OrderManager(order, menuManager);
    }).toThrow('ERROR');
  });

  test('메뉴판에 없는 메뉴이면 예외가 발생한다.', () => {
    const order = ['로제크림파스타-1', '화이트와인-1'];
    expect(() => {
      new OrderManager(order, menuManager);
    }).toThrow('ERROR');
  });
});
