import EventManager from '../../src/models/EventManager';

const mockOrderManager = { filterItemsByProperty: jest.fn(), getTotalPrice: jest.fn() };
const mockEventManager = { getTotalBenefit: jest.fn() };

let eventManager;

const setMockOrderManager = (menuItems, totalPrice, totalBenefit) => {
  mockOrderManager.filterItemsByProperty.mockReturnValue(menuItems);
  mockOrderManager.getTotalPrice.mockReturnValue(totalPrice);
  mockEventManager.getTotalBenefit.mockReturnValue(totalBenefit);
};

const initEventManagerAndCalculateBenefit = (date) => {
  eventManager = new EventManager(date);
  eventManager.calculateDiscountAndBenefit(mockOrderManager);

  return eventManager.getBenefitInfo();
};

describe('EventManager 클래스 할인 적용 테스트', () => {
  beforeEach(() => {
    mockOrderManager.filterItemsByProperty.mockClear();
    mockOrderManager.getTotalPrice.mockClear();
  });

  test('크리스마스 할인이 되는지 확인한다.', () => {
    setMockOrderManager([], 0, 0);
    const benefitInfo = initEventManagerAndCalculateBenefit(5);
    expect(benefitInfo.xmasDiscount).toBe(-1400);
  });

  test('특별일자 할인이 되는지 확인한다.', () => {
    setMockOrderManager([], 0, 0);
    const benefitInfo = initEventManagerAndCalculateBenefit(17);
    expect(benefitInfo.specialdayDiscount).toBe(-1000);
  });

  test('평일 할인이 되는지 확인한다.', () => {
    const orderMenu = { name: '초코케이크', quantity: 2, price: 15000, category: 'dessert' };
    setMockOrderManager([{ getOrderMenu: () => orderMenu }], 0, 0);
    const benefitInfo = initEventManagerAndCalculateBenefit(11);
    expect(benefitInfo.weekdayDiscount).toBe(-4046);
  });

  test('주말 할인이 되는지 확인한다.', () => {
    const orderMenu1 = { name: '티본스테이크', quantity: 1, price: 55000, category: 'main' };
    const orderMenu2 = { name: '바비큐립', quantity: 1, price: 54000, category: 'main' };
    setMockOrderManager(
      [{ getOrderMenu: () => orderMenu1 }, { getOrderMenu: () => orderMenu2 }],
      0,
      0
    );
    const benefitInfo = initEventManagerAndCalculateBenefit(15);
    expect(benefitInfo.weekendDiscount).toBe(-4046);
  });

  test('샴페인 증정이 되는지 확인한다.', () => {
    setMockOrderManager([], 120000, 0);
    const benefitInfo = initEventManagerAndCalculateBenefit(10);
    expect(benefitInfo.isChampagne).toBe(true);
  });

  test('할인 금액에 따른 배지 증정이 되는지 확인한다.', () => {
    setMockOrderManager([], 120000, -20000);
    const benefitInfo = initEventManagerAndCalculateBenefit(10);
    expect(benefitInfo.badge).toBe('산타');
  });
});

describe('EventManager 클래스 할인 금액 계산 테스트', () => {
  test('총 할인 금액 계산 테스트', () => {
    setMockOrderManager([], 0, 0);
    initEventManagerAndCalculateBenefit(5);
    const totalDiscount = eventManager.getTotalDiscount();
    expect(totalDiscount).toBe(-1400);
  });

  test('총 혜택 금액 계산 테스트', () => {
    setMockOrderManager([], 120000, 0);
    initEventManagerAndCalculateBenefit(1);
    const totalBenefit = eventManager.getTotalBenefit();
    expect(totalBenefit).toBe(-26000);
  });
});
