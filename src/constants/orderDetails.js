import { UNIT, BENEFIT_LIST } from './options.js';

export const TITLE = Object.freeze([
  '\n<주문 메뉴>',
  '\n<할인 전 총주문 금액>',
  '\n<증정 메뉴>',
  '\n<혜택 내역>',
  '\n<총혜택 금액>',
  '\n<할인 후 예상 결제 금액>',
  '\n<12월 이벤트 배지>',
]);

export const GIFT_MENU = '샴페인 1개';

export const COMMON = Object.freeze({
  none: '없음',
  orderMenu: (order) => `${order.name} ${order.quantity}개`,
  price: (price) => `${price.toLocaleString('ko-KR')}원`,
});

export const BENEFIT_MESSAGE = Object.freeze([
  {
    benefit: BENEFIT_LIST.xmasDiscount,
    text: (benefit) => `크리스마스 디데이 할인: ${COMMON.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.weekdayDiscount,
    text: (benefit) => `평일 할인: ${COMMON.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.weekendDiscount,
    text: (benefit) => `주말 할인: ${COMMON.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.specialdayDiscount,
    text: (benefit) => `특별 할인: ${COMMON.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.isChampagne,
    text: (benefit) =>
      `증정 이벤트: ${benefit ? COMMON.price(UNIT.champagneDiscountAmount) : COMMON.none}`,
  },
]);
