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
});
