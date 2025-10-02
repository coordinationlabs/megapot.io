/**
 * Formats a USDC amount as a number string
 * @param amount - The amount in wei (smallest unit) or as a number
 * @returns Formatted number string with proper formatting
 */
export function formatUSDC(amount: string | number | bigint): string {
  const numericAmount = Number(amount) / 1e6;

  // Format as currency
  const formatted = numericAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatted;
}

/**
 * Formats a Unix timestamp (in seconds) to a human-readable date
 * @param timestamp - Unix timestamp in seconds as bigint
 * @returns Formatted date string (e.g., "Oct 1, 12:00pm")
 */
export function formatDrawingTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
