import { describe } from 'node:test';
import OrderManager from '../src/domain/OrderManager';

const order = ['티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-1'];
const orderManager = new OrderManager(order);

describe('OrderManager 클래스 테스트', () => {
  test('메뉴와 수량으로 구분된 객체로 반환되는지 확인한다.', () => {
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];
    expect(orderManager.parseOrder(order)).toEqual(orderList);
  });
});
