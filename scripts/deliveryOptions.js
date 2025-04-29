export const deliveryOptions = [
  {
    id: '1',
    deliveryHours: 2,
    dollar: 2000
  },
  {
    id: '2',
    deliveryHours: 4,
    dollar: 1000
  },
  {
    id: '3',
    deliveryHours: 24,
    dollar: 0
  }
];

export function getDeliveryOption(deliveryOptionId) {
  return deliveryOptions.find((option) => option.id === deliveryOptionId);
}