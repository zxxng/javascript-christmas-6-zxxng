import EventManager from '../../src/domain/EventManager';

const mockOrderManager = {
  getOrderList: jest.fn(),
  getTotalPrice: jest.fn(),
};

const mockMenuManager = {
  countMenuType: jest.fn(),
};

describe('EventManager 클래스 테스트', () => {
  test('크리스마스 할인이 되는지 확인한다.', () => {
    const date = 5;
    const eventManager = new EventManager(date);

    eventManager.calculateDiscount(mockOrderManager, mockMenuManager);

    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.xmasDiscount).toBe(1400);
  });

  test('특별일자 할인이 되는지 확인한다.', () => {
    const date = 17;
    const eventManager = new EventManager(date);

    eventManager.calculateDiscount(mockOrderManager, mockMenuManager);

    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.specialdayDiscount).toBe(1000);
  });

  const menuList = [
    { menu: '티본스테이크', quantity: 1 },
    { menu: '바비큐립', quantity: 1 },
    { menu: '초코케이크', quantity: 2 },
    { menu: '제로콜라', quantity: 1 },
  ];

  test('평일 할인이 되는지 확인한다.', () => {
    const date = 11;
    const eventManager = new EventManager(date);

    mockOrderManager.getOrderList.mockReturnValue(menuList);
    mockMenuManager.countMenuType.mockReturnValue(2);
    eventManager.calculateDiscount(mockOrderManager, mockMenuManager);

    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.weekdayDiscount).toBe(4046);
    expect(benefitInfo.weekendDiscount).toBe(0);
  });

  test('주말 할인이 되는지 확인한다.', () => {
    const date = 15;
    const eventManager = new EventManager(date);

    mockOrderManager.getOrderList.mockReturnValue(menuList);
    mockMenuManager.countMenuType.mockReturnValue(2);
    eventManager.calculateDiscount(mockOrderManager, mockMenuManager);

    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.weekdayDiscount).toBe(0);
    expect(benefitInfo.weekendDiscount).toBe(4046);
  });

  const date = 10;
  const eventManager = new EventManager(date);
  test('샴페인 증정이 되는지 확인한다.', () => {
    eventManager.canGetChampagne(120000);

    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.isChampagne).toBe(true);
  });

  test('할인 금액에 따른 배지 증정이 되는지 확인한다.', () => {
    eventManager.canGetBadge(20000);

    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.badge).toBe('산타');
  });
});
