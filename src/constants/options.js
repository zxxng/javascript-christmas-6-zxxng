export const UNIT = Object.freeze({
  eventThreshold: 10000,
  champagneThreshold: 120000,
  champagneDiscountAmount: -25000,
  baseXmasDiscountAmount: -1000,
  dailyXmasDiscountAmount: -100,
  specialdayDiscountAmount: -1000,
  decemberDiscountAmount: -2023,
});

export const DATE = Object.freeze({
  xmas: 25,
  specialDays: [3, 10, 17, 24, 25, 31],
  thisYear: 2023,
  thisMonth: 12 - 1,
  isWeekday: (dateNumber) => dateNumber < 5,
});

export const BADGES = Object.freeze([
  { min: 20000, badge: '산타' },
  { min: 10000, badge: '트리' },
  { min: 5000, badge: '별' },
]);

export const BENEFIT_LIST = Object.freeze({
  xmasDiscount: 'xmasDiscount',
  specialdayDiscount: 'specialdayDiscount',
  weekdayDiscount: 'weekdayDiscount',
  weekendDiscount: 'weekendDiscount',
  isChampagne: 'isChampagne',
  badge: 'badge',
});
