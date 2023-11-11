import MenuManager from '../../src/domain/MenuManager';

describe('MenuManager 클래스 테스트', () => {
  const menuManager = new MenuManager();
  const menuList = menuManager.getMenuList();

  test('menuList가 배열 형태인지 확인한다.', () => {
    expect(Array.isArray(menuList)).toBe(true);
  });

  const property = ['type', 'name', 'price'];
  test.each(property)('각 메뉴에 %s 속성이 있는지 확인한다.', (key) => {
    menuList.forEach((menuItem) => {
      expect(menuItem).toHaveProperty(key);
    });
  });

  test('메뉴판에 없는 메뉴이면 예외가 발생한다.', () => {
    const menu = [
      { menu: '로제크림파스타', quantity: 1 },
      { menu: '화이트와인', quantity: 1 },
    ];
    expect(() => menuManager.validateMenu(menu)).toThrow('[ERROR]');
  });

  test('음료만 주문 시 예외가 발생한다.', () => {
    const menu = [
      { menu: '제로콜라', quantity: 1 },
      { menu: '레드와인', quantity: 1 },
    ];
    expect(() => menuManager.validateMenu(menu)).toThrow('[ERROR]');
  });
});