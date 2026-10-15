// General helper utilities

/**
 * Combines class names conditionally without external dependencies
 */
export function cn(
  ...classes: (string | boolean | undefined | null | number | false)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Simulates network latency for mock backend API calls
 */
export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
