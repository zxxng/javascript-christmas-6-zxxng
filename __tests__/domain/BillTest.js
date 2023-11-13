import Bill from '../../src/domain/Bill';

const mockOrderManager = {
  getOrderList: jest.fn(),
};

const mockEventManager = {
  getBenefitInfo: jest.fn(),
};

const mockMenuManager = {
  findProperty: jest.fn(),
};

describe('Bill 클래스 테스트', () => {
  const mockOrderList = [
    { menu: '티본스테이크', quantity: 2 },
    { menu: '크리스마스파스타', quantity: 2 },
    { menu: '레드와인', quantity: 1 },
  ];
  const mockBenefitInfo = {
    xmasDiscount: 1500,
    weekdayDiscount: 4046,
    weekendDiscount: 0,
    champagne: '샴페인 1개',
  };
  const mockMenuPrice = { 티본스테이크: 55000, 크리스마스파스타: 25000, 레드와인: 60000 };

  mockOrderManager.getOrderList.mockReturnValue(mockOrderList);
  mockEventManager.getBenefitInfo.mockReturnValue(mockBenefitInfo);
  mockMenuManager.findProperty.mockImplementation((menu) => mockMenuPrice[menu]);

  const bill = new Bill(mockOrderManager, mockEventManager, mockMenuManager);

  test('총 주문금액을 반환하는지 확인한다.', () => {
    const expectedTotalPrice = 55000 * 2 + 25000 * 2 + 60000;
    expect(bill.getTotalPrice()).toBe(expectedTotalPrice);
  });

  test('총 혜택금액을 반환하는지 확인한다.', () => {
    const expectedTotalBenefit = 1500 + 4046 + (mockBenefitInfo.champagne ? 25000 : 0);
    expect(bill.getTotalBenefit()).toBe(expectedTotalBenefit);
  });

  test('할인 후 예상 결제 금액을 반환하는지 확인한다.', () => {
    const expectedPayment =
      bill.getTotalPrice() - bill.getTotalBenefit() + (mockBenefitInfo.champagne ? 25000 : 0);
    expect(bill.getEstimatedPayment()).toBe(expectedPayment);
  });
});
