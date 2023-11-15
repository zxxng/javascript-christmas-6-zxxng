import Order from '../../src/models/Order';

describe('Order 클래스 테스트', () => {
  const orderList = [
    ['티본스테이크', '1'],
    ['바비큐립', '1'],
    ['초코케이크', '2'],
    ['제로콜라', '1'],
  ];
  const orderResult = [
    { name: '티본스테이크', quantity: 1, price: 55000, category: 'main' },
    { name: '바비큐립', quantity: 1, price: 54000, category: 'main' },
    { name: '초코케이크', quantity: 2, price: 15000, category: 'dessert' },
    { name: '제로콜라', quantity: 1, price: 3000, category: 'beverage' },
  ];
  orderList.map((order, index) => {
    test(`메뉴와 수량으로 구분된 객체로 반환되는지 확인한다. - ${order[0]}`, () => {
      const newOrder = new Order(order);
      expect(newOrder.getOrderMenu()).toEqual(orderResult[index]);
    });
  });

  const invalidMenus = [
    ['로제크림파스타', '1'],
    ['화이트와인', '1'],
  ];
  test.each(invalidMenus)('메뉴판에 없는 메뉴이면 예외가 발생한다.', (order) =>
    expect(() => new Order(order)).toThrow('ERROR')
  );

  const invalidQuantity = [
    ['양송이수프', ''],
    ['해산물파스타', '0'],
    ['아이스크림', '1개'],
  ];
  test.each(invalidQuantity)(
    '주문 수량이 없거나, 숫자가 아니거나, 0이면 예외가 발생한다.',
    (order) => expect(() => new Order(order)).toThrow('ERROR')
  );
});
