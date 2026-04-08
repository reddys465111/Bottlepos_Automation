/**
 * Timeout configuration for Playwright automation
 * Centralized timeout values to avoid hardcoding throughout the codebase
 */
export const Timeouts = {
  // Element visibility timeouts
  ELEMENT_VISIBLE: 2000,
  ELEMENT_HIDDEN: 2000,
  
  // Action timeouts
  CLICK: 5000,
  HOVER: 3000,
  WAIT_FOR: 5000,
  
  // Navigation timeouts
  PAGE_LOAD: 30000,
  NAVIGATION: 15000,
  
  // API timeouts
  API_REQUEST: 10000,
  
  // Custom timeouts for specific scenarios
  SLOW_LOADING_ELEMENT: 10000,
  PAYMENT_PROCESSING: 30000,
  
  // Default timeout for general operations
  DEFAULT: 5000,

  // Dialog timeouts
  DIALOG_VISIBLE: 5000,
  DIALOG_HIDDEN: 5000,

  // Medium timeouts
  MEDIUM: 2500,
} as const;

/**
 * Get timeout value with fallback to default
 * @param timeoutType - The type of timeout to get
 * @param customTimeout - Optional custom timeout value
 * @returns timeout value in milliseconds
 */
export function getTimeout(timeoutType: keyof typeof Timeouts, customTimeout?: number): number {
  return customTimeout ?? Timeouts[timeoutType];
} 