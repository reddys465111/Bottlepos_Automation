/**
 * Number Manager Utility
 * Handles number conversions and formatting
 */

/**
 * Converts currency string to number
 * Removes dollar signs, commas, and other currency symbols
 * @param currencyStr - Currency string like "$1,018.92" or "1,405.32"
 * @returns Number value
 * @example
 * currencyToNumber("$1,018.92") // Returns: 1018.92
 * currencyToNumber("$1,405.32") // Returns: 1405.32
 * currencyToNumber("8") // Returns: 8
 */
export function currencyToNumber(currencyStr: string): number {
    if (!currencyStr || typeof currencyStr !== 'string') {
      return 0;
    }
    
    // Remove currency symbols ($, €, £, etc.), commas, and spaces
    const cleanedStr = currencyStr.replace(/[$€£¥,\s]/g, '');
    
    // Parse to float
    const number = parseFloat(cleanedStr);
    
    // Return 0 if parsing failed
    return isNaN(number) ? 0 : number;
  }
  
  /**
   * Formats a number as currency
   * @param amount - Number to format
   * @param currencySymbol - Currency symbol to use (default: "$")
   * @param decimals - Number of decimal places (default: 2)
   * @returns Formatted currency string
   * @example
   * numberToCurrency(1018.92) // Returns: "$1,018.92"
   * numberToCurrency(1405.3, "$", 2) // Returns: "$1,405.30"
   */
  export function numberToCurrency(amount: number, currencySymbol: string = "$", decimals: number = 2): string {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return `${currencySymbol}0.${"0".repeat(decimals)}`;
    }
    
    return `${currencySymbol}${amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  
  /**
   * Rounds a number to specified decimal places
   * @param num - Number to round
   * @param decimals - Number of decimal places (default: 2)
   * @returns Rounded number
   */
  export function roundToDecimals(num: number, decimals: number = 2): number {
    const multiplier = Math.pow(10, decimals);
    return Math.round(num * multiplier) / multiplier;
  }
  
  /**
   * Checks if two numbers are equal within a tolerance
   * Useful for comparing floating point numbers
   * @param num1 - First number
   * @param num2 - Second number
   * @param tolerance - Acceptable difference (default: 0.01)
   * @returns True if numbers are equal within tolerance
   */
  export function numbersAreEqual(num1: number, num2: number, tolerance: number = 0.01): boolean {
    return Math.abs(num1 - num2) <= tolerance;
  }
  
  export const Round = (num: number | string, decimalPlaces: number = 2) => {
    let actualNum = 0;
    if (typeof (num) === 'string')
        actualNum = Number(num);
    else
        actualNum = num;
    const factor = 10 ** decimalPlaces;
    return Math.round(actualNum * factor) / factor;
  }