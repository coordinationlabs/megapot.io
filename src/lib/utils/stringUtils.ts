/**
 * Formats a USDC amount as a number string
 * @param amount - The amount in wei (smallest unit) or as a number
 * @returns Formatted number string with proper formatting
 */
export function formatUSDC(amount: string | number | bigint): string {
  // Convert to number and adjust for USDC decimals (6)
  const numericAmount = Number(amount) / 1e6;

  // Format as currency
  const formatted = numericAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatted;
}
