export const ERROR_MESSEGE = {
  nonNumericInput: '[ERROR] 숫자만 입력 가능합니다.',
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  nonSpecialCharacterInput: "[ERROR] 주문시 특수문자는 '-'만 입력 가능합니다.",
  invalidOrder:
    "[ERROR] 주문형식이 올바르지 않습니다. '메뉴명-수량' 형식으로 입력해주세요.",
};

export const WOOTECO_MESSAGE = {
  introduce: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  benefitsPreview: (day) => {
    `12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`;
  },
};

export const INPUT_MESSAGE = {
  askReservationDate:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
  askMenuAndCount:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
};

export const ORDER_DETAILS_MESSAGE = {
  orderMenu: '<주문 메뉴>',
  totalOrderAmount: '<할인 전 총주문 금액>',
  giftMenu: '<증정 메뉴>',
  benefitsDetails: '<혜택 내역>',
  totalBenefitAmount: '<총혜택 금액>',
  expectedPaymentAmount: '<할인 후 예상 결제 금액>',
  decemberEventBadges: '<12월 이벤트 배지>',
  menuAndCount: (menu, count) => `${menu} ${count}개`,
  price: (price) => `${price}원`,
  benefitsDetailsFormat:
    '크리스마스 디데이 할인: -1,200원\n평일 할인: -4,046원\n특별 할인: -1,000원\n증정 이벤트: -25,000원',
};
