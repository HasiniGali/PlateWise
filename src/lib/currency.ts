// PlateWise - Currency Formatting Utility
// Centralized Indian Rupee (INR) formatter used across all features

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Formats a numeric amount as Indian Rupees (e.g. 1250 -> "₹1,250")
 * Uses the Indian numbering system (thousands, lakhs, crores)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return inrFormatter.format(amount);
}
