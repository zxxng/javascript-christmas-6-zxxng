import { describe } from 'node:test';
import DiscountManager from '../../src/domain/DiscountManager';

describe('DiscountManager 클래스 테스트', () => {
  test('크리스마스 할인이 되는지 확인한다.', () => {
    const date = 5;
    const discountManager = new DiscountManager(date);
    discountManager.calculateXmasDiscount();

    const discountAmount = discountManager.getDiscountAmout();
    expect(discountAmount.xmasDiscount).toBe(1400);
  });

  test('특별일자 할인이 되는지 확인한다.', () => {
    const date = 17;
    const discountManager = new DiscountManager(date);
    discountManager.calculateSpecialdayDiscount();

    const discountAmount = discountManager.getDiscountAmout();
    expect(discountAmount.specialdayDiscount).toBe(1000);
  });

  const mockOrderManager = {
    getMenuList: jest.fn(),
  };

  const mockMenuManager = {
    countMenuType: jest.fn(),
  };

  const menuList = [
    { menu: '티본스테이크', quantity: 1 },
    { menu: '바비큐립', quantity: 1 },
    { menu: '초코케이크', quantity: 2 },
    { menu: '제로콜라', quantity: 1 },
  ];

  test('평일 할인이 되는지 확인한다.', () => {
    const date = 11;
    const discountManager = new DiscountManager(date);

    mockOrderManager.getMenuList.mockReturnValue(menuList);
    mockMenuManager.countMenuType.mockReturnValue(2);
    discountManager.calculateDecemberDiscount(mockOrderManager, mockMenuManager);

    const discountAmount = discountManager.getDiscountAmout();
    expect(discountAmount.weekdayDiscount).toBe(4046);
  });

  test('주말 할인이 되는지 확인한다.', () => {
    const date = 15;
    const discountManager = new DiscountManager(date);

    mockOrderManager.getMenuList.mockReturnValue(menuList);
    mockMenuManager.countMenuType.mockReturnValue(2);
    discountManager.calculateDecemberDiscount(mockOrderManager, mockMenuManager);

    const discountAmount = discountManager.getDiscountAmout();
    expect(discountAmount.weekendDiscount).toBe(4046);
  });
});
