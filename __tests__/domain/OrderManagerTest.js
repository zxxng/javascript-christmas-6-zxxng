import { describe } from 'node:test';
import OrderManager from '../../src/domain/OrderManager';

describe('OrderManager 클래스 테스트', () => {
  test('메뉴와 수량으로 구분된 객체로 반환되는지 확인한다.', () => {
    const order = [
      '티본스테이크-1',
      '바비큐립-1',
      '초코케이크-2',
      '제로콜라-1',
    ];
    const orderManager = new OrderManager(order);
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];
    expect(orderManager.parseOrder(order)).toEqual(orderList);
  });

  const testThrowsError = (order) => {
    expect(() => {
      new OrderManager(order);
    }).toThrow('[ERROR]');
  };

  test('메뉴의 개수가 1개 미만이면 예외가 발생한다.', () => {
    const order = ['티본스테이크-0', '제로콜라-1'];
    testThrowsError(order);
  });

  test('메뉴를 한 번에 20개 넘게 주문하면 예외가 발생한다.', () => {
    const order = ['양송이수프-12', '티본스테이크-6', '크리스마스파스타-6'];
    testThrowsError(order);
  });

  test('중복메뉴가 있으면 예외가 발생한다.', () => {
    const order = ['바비큐립-1', '바비큐립-1', '샴페인-1'];
    testThrowsError(order);
  });
});
