import { describe } from 'node:test';
import MenuGenerator from '../../src/domain/MenuGenerator';

describe('MenuGenerator 클래스 테스트', () => {
  const menuGenerator = new MenuGenerator();
  const menuList = menuGenerator.getMenuList();

  console.log(menuList);
  test('menuList가 배열 형태인지 확인한다.', () => {
    expect(Array.isArray(menuList)).toBe(true);
  });

  test('각 메뉴에 type 속성이 있는지 확인한다.', () => {
    menuList.forEach((menuItem) => {
      expect(menuItem).toHaveProperty('type');
    });
  });

  test('각 메뉴에 name 속성이 있는지 확인한다.', () => {
    menuList.forEach((menuItem) => {
      expect(menuItem).toHaveProperty('name');
    });
  });

  test('각 메뉴에 price 속성이 있는지 확인한다.', () => {
    menuList.forEach((menuItem) => {
      expect(menuItem).toHaveProperty('price');
    });
  });

  test('메뉴판에 없는 메뉴이면 예외가 발생한다.', () => {
    const menu = [
      { menu: '로제크림파스타', quantity: 1 },
      { menu: '화이트와인', quantity: 1 },
    ];
    expect(menuGenerator.validateMenu(menu)).toThrow('[ERROR]');
  });

  test('음료만 주문 시 예외가 발생한다.', () => {
    const menu = [
      { menu: '제로콜라', quantity: 1 },
      { menu: '레드와인', quantity: 1 },
    ];
    expect(menuGenerator.validateMenu(menu)).toThrow('[ERROR]');
  });
});
