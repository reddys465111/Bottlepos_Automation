import moment from "moment";

// Predefined date format constants
export const DateFormats = {
  US_DATE: 'MM/DD/YYYY', // Default format
  US_DATE_TIME: 'MM/DD/YYYY HH:mm:ss',
  US_DATE_TIME_12H: 'MM/DD/YYYY hh:mm:ss A',
  ISO_DATE: 'YYYY-MM-DD',
  ISO_DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  ISO_DATETIME_FULL: 'YYYY-MM-DDTHH:mm:ss',
  EUROPEAN_DATE: 'DD/MM/YYYY',
  EUROPEAN_DATE_TIME: 'DD/MM/YYYY HH:mm:ss',
  DISPLAY_DATE: 'MMMM DD, YYYY',
  DISPLAY_DATE_TIME: 'MMMM DD, YYYY HH:mm:ss',
  SHORT_DATE: 'MMM DD, YYYY',
  COMPACT_DATE: 'YYYYMMDD',
  COMPACT_DATETIME: 'YYYYMMDDHHmmss'
} as const;

/**
 * Get the current date in the specified format using moment.js formatting.
 * Default format is MM/DD/YYYY (US format).
 * @param withTime - Whether to include time (default: false). When true, adds HH:mm:ss to MM/DD/YYYY format.
 * @param format - Custom moment.js format string or predefined format from DateFormats. When provided, overrides default MM/DD/YYYY format.
 * @returns The current date in the specified format (default: MM/DD/YYYY)
 * 
 * @example Basic usage (MM/DD/YYYY format):
 * GetCurrentDate() // "10/01/2023" (default MM/DD/YYYY format)
 * GetCurrentDate(true) // "10/01/2023 14:30:45" (MM/DD/YYYY HH:mm:ss format)
 * 
 * @example Custom formats:
 * GetCurrentDate(false, DateFormats.ISO_DATE) // "2023-10-01"
 * GetCurrentDate(false, DateFormats.EUROPEAN_DATE) // "01/10/2023"
 * GetCurrentDate(false, DateFormats.DISPLAY_DATE) // "October 01, 2023"
 * GetCurrentDate(false, 'dddd, MMMM Do YYYY') // "Sunday, October 1st 2023"
 * 
 * @example Time variations:
 * GetCurrentDate(false, 'HH:mm:ss') // "14:30:45" (24-hour)
 * GetCurrentDate(false, 'hh:mm:ss A') // "02:30:45 PM" (12-hour)
 * GetCurrentDate(false, DateFormats.US_DATE_TIME_12H) // "10/01/2023 02:30:45 PM"
 */
export function GetCurrentDate(withTime: boolean = false, format?: string): string {
  try {
    // If custom format is provided, use it directly
    if (format) {
      return moment().format(format);
    }
    
    // Default format is MM/DD/YYYY, with time as MM/DD/YYYY HH:mm:ss when withTime is true
    const defaultFormat = withTime ? DateFormats.US_DATE_TIME : DateFormats.US_DATE; // MM/DD/YYYY
    return moment().format(defaultFormat);
    
  } catch (error) {
    console.error('Error formatting date:', error);
    // Fallback to basic ISO format on error
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }
}

/**
 * Helper function to get current date in commonly used formats
 * @returns Object with pre-formatted date strings in various formats
 * @example
 * const dates = GetCurrentDateFormats();
 * console.log(dates.usDate);        // "10/01/2023"
 * console.log(dates.isoDate);       // "2023-10-01"
 * console.log(dates.displayDate);   // "October 01, 2023"
 */
export function GetCurrentDateFormats() {
  const now = moment();
  return {
    usDate: now.format(DateFormats.US_DATE),
    usDateTime: now.format(DateFormats.US_DATE_TIME),
    usDateTime12h: now.format(DateFormats.US_DATE_TIME_12H),
    isoDate: now.format(DateFormats.ISO_DATE),
    isoDateTime: now.format(DateFormats.ISO_DATE_TIME),
    isoDateTimeFull: now.format(DateFormats.ISO_DATETIME_FULL),
    europeanDate: now.format(DateFormats.EUROPEAN_DATE),
    europeanDateTime: now.format(DateFormats.EUROPEAN_DATE_TIME),
    displayDate: now.format(DateFormats.DISPLAY_DATE),
    displayDateTime: now.format(DateFormats.DISPLAY_DATE_TIME),
    shortDate: now.format(DateFormats.SHORT_DATE),
    compactDate: now.format(DateFormats.COMPACT_DATE),
    compactDateTime: now.format(DateFormats.COMPACT_DATETIME),
  };
}

// Function to parse a date string in MM/DD/YYYY format
/**
 * Parses a date string in MM/DD/YYYY format and returns a moment object.
 * @param dateString - The date string to parse (e.g., "10/01/2023").
 * @param format - Optional date format (default: 'MM/DD/YYYY').
 * @returns - A moment object representing the parsed date.
 * @example - parseDate("10/01/2023") // returns a moment object
 * @example - parseDate("2023-10-01", "YYYY-MM-DD") // returns a moment object
 */
export function parseDate(dateString: string, format: string = "MM/DD/YYYY"): moment.Moment {
  return moment(dateString, format);
}

/**
 * Subtracts two dates and returns the difference in years.
 * @param date1 - The first date string (e.g., "10/01/2023").
 * @param date2 - The second date string (e.g., "10/01/2000").
 * @returns - The difference in years between the two dates.
 * @example - GetAge("10/01/2023", "10/01/2000") // returns 23
 */
export function GetAge(date1: string, date2: string): number {
  const date1Moment = moment(date1, "MM/DD/YYYY");
  const date2Moment = moment(date2, "MM/DD/YYYY");
  return date1Moment.diff(date2Moment, 'years');
}

/**
 * Get the current date in ISO 8601 format (YYYY-MM-DDTHH:mm:ss+00:00).
 * @returns - The current date in ISO 8601 format.
 * @example - GetISODateFormat() // returns "2023-10-01T12:34:56+00:00"
 */
export const GetISODateFormat = () => {

  const now = new Date();
    // Pad numbers with leading zeros if needed
  const pad = (num: any) => String(num).padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
}

/**
 * Calulate the date of a given number of days ago based on the current date.
 * @param days - The number of days to go back
 * @param format - Optional date format (default: MM/DD/YYYY)
 * @returns - The date string in the specified format
 * @example - getDateDaysAgo(30) // returns "09/30/2023"
 * @example - getDateDaysAgo(30, "YYYY-MM-DD") // returns "2023-09-30"
 */

export const getDateDaysAgo = (days: number, format: string = "MM/DD/YYYY"): string => {
  const years = Math.floor(days / 365); // Approximate years
  const remainingDays = days % 365; // Remaining days after full years
  const date = moment().subtract(years, 'years').subtract(remainingDays, 'days');
  return date.format(format);
};



/**
 * Calulate the date of a given number of days ago based on the current date.
 * @param days - The number of days to go back
 * @param format - Optional date format (default: MM/DD/YYYY)
 * @returns - The date string in the specified format
 * @example - getDateDaysAhead(30) // returns "09/30/2023"
 * @example - getDateDaysAhead(30, "YYYY-MM-DD") // returns "2023-09-30"
 */

export const getDateDaysAhead = (days: number, format: string = "MM/DD/YYYY"): string => {
  const years = Math.floor(days / 365); // Approximate years
  const remainingDays = days % 365; // Remaining days after full years
  const date = moment().add(years, 'years').add(remainingDays, 'days');
  return date.format(format);
};