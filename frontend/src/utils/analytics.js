export function calculateConversionRate(conversions, views) {
  if (views <= 0) {
    return 0;
  }

  return (conversions / views) * 100;
}