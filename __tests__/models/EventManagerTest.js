import EventManager from '../../src/models/EventManager';

const mockOrderManager = {
  filterItemsByProperty: jest.fn(),
  getTotalPrice: jest.fn(),
};

const mockEventManager = {
  getTotalBenefit: jest.fn(),
};

let eventManager;

describe('EventManager 클래스 할인 적용 테스트', () => {
  beforeEach(() => {
    mockOrderManager.filterItemsByProperty.mockClear();
    mockOrderManager.getTotalPrice.mockClear();
  });

  test('크리스마스 할인이 되는지 확인한다.', () => {
    eventManager = new EventManager(5);
    mockOrderManager.filterItemsByProperty.mockReturnValue([]);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.xmasDiscount).toBe(-1400);
  });

  test('특별일자 할인이 되는지 확인한다.', () => {
    eventManager = new EventManager(17);
    mockOrderManager.filterItemsByProperty.mockReturnValue([]);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.specialdayDiscount).toBe(-1000);
  });

  test('평일 할인이 되는지 확인한다.', () => {
    eventManager = new EventManager(11);
    mockOrderManager.filterItemsByProperty.mockReturnValue(['dessert']);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.weekdayDiscount).toBe(-2023);
  });

  test('주말 할인이 되는지 확인한다.', () => {
    eventManager = new EventManager(15);
    mockOrderManager.filterItemsByProperty.mockReturnValue(['main']);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.weekendDiscount).toBe(-2023);
  });

  test('샴페인 증정이 되는지 확인한다.', () => {
    eventManager = new EventManager(10);
    mockOrderManager.getTotalPrice.mockReturnValue(120000);
    mockOrderManager.filterItemsByProperty.mockReturnValue([]);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.isChampagne).toBe(true);
  });

  test('할인 금액에 따른 배지 증정이 되는지 확인한다.', () => {
    eventManager = new EventManager(10);
    mockEventManager.getTotalBenefit.mockReturnValue(-20000);
    mockOrderManager.filterItemsByProperty.mockReturnValue([]);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const benefitInfo = eventManager.getBenefitInfo();
    expect(benefitInfo.badge).toBe('산타');
  });
});

describe('EventManager 클래스 할인 금액 계산 테스트', () => {
  test('총 할인 금액 계산 테스트', () => {
    eventManager = new EventManager(5);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const totalDiscount = eventManager.getTotalDiscount();
    expect(totalDiscount).toBe(-1400);
  });

  test('총 혜택 금액 계산 테스트', () => {
    eventManager = new EventManager(1);
    mockOrderManager.getTotalPrice.mockReturnValue(120000);
    eventManager.calculateDiscountAndBenefit(mockOrderManager);
    const totalBenefit = eventManager.getTotalBenefit();
    expect(totalBenefit).toBe(-26000);
  });
});
