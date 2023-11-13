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
});
