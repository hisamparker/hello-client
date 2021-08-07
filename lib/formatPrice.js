// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
export default function formatPrice(amount = 0) {
  let digits = 2;
  if (amount % 100 === 0) {
    digits = 0;
  }
  const formatter = Intl.NumberFormat('en-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
  });
  return formatter.format(amount / 100);
}
