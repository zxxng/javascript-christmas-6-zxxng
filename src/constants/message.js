import { BENEFIT_LIST } from './options';

export const ERROR_MESSAGE = {
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidOrder: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
};

export const WOOTECO_MESSAGE = {
  introduce: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  benefitsPreview: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
};

export const INPUT_MESSAGE = {
  askReservationDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  askMenuAndCount:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

export const TITLE_MESSAGE = {
  orderMenu: '<주문 메뉴>',
  beforeTotalPrice: '<할인 전 총주문 금액>',
  giftMenu: '<증정 메뉴>',
  benefitList: '<혜택 내역>',
  totalDiscount: '<총혜택 금액>',
  estimatedPayment: '<할인 후 예상 결제 금액>',
  eventBadge: '<12월 이벤트 배지>',
};

export const TEXT_FORMAT = {
  none: '없음',
  giftMenu: '샴페인 1개',
  orderMenu: (order) => `${order.menu} ${order.quantity}개`,
  price: (price) => `${price}원`,
};

export const BENEFIT_MESSAGE = [
  {
    benefit: BENEFIT_LIST.xmasDiscount,
    text: (benefit) => `크리스마스 디데이 할인: ${TEXT_FORMAT.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.weekdayDiscount,
    text: (benefit) => `평일 할인: ${TEXT_FORMAT.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.weekendDiscount,
    text: (benefit) => `주말 할인: ${TEXT_FORMAT.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.specialdayDiscount,
    text: (benefit) => `특별 할인: ${TEXT_FORMAT.price(benefit)}`,
  },
  {
    benefit: BENEFIT_LIST.isChampagne,
    text: (benefit) => `증정 이벤트: ${benefit ? TEXT_FORMAT.price(25000) : TEXT_FORMAT.none}`,
  },
];
