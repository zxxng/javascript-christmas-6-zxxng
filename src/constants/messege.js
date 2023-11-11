export const ERROR_MESSEGE = {
  nonNumericInput: '[ERROR] 숫자만 입력 가능합니다.',
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  nonSpecialCharacterInput: "[ERROR] 주문시 특수문자는 '-'만 입력 가능합니다.",
  invalidOrder: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
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
