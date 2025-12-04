import { Session } from "../utils";

/**
 * Generate a unique payment ID
 * @description This function generates a unique payment ID by combining the current timestamp with the user's credentials.
 * The timestamp is obtained using Date.now(), which returns the number of milliseconds since January 1, 1970.
 * @returns 
 */
export const GeneratePaymentID = (): string|undefined => {
  // Create a Date object for January 1, 2000
  const startOfYear2000 = new Date(2000, 0, 1);
  
  // Get the current time in milliseconds
  const currentTime = Date.now();
  
  // Calculate the difference in milliseconds
  const millisecondsDifference = currentTime - startOfYear2000.getDate();

  const credentials: string = Session.User;
  let hex= '';
  for(let i=0 ; i< credentials.length; i++){
      hex += credentials.charCodeAt(i).toString(16)
  }
  
  return 'pi_Bott'+hex + millisecondsDifference.toString(16).padStart(22-hex.length, '0');;
}

/**
 * Generate a unique transaction ID
 * @description This function generates a unique transaction ID by combining the current timestamp with two random negative numbers.
 * The timestamp is obtained using Date.now(), which returns the number of milliseconds since January 1, 1970.
 * @returns 
 */
export const GenerateTransactionID = () => {
  // Generate a timestamp
  const timestamp = Date.now();

  // Generate two random negative numbers
  const randomNegative1 = Math.floor(Math.random() * -100) - 1; // Range: -1 to -100
  const randomNegative2 = Math.floor(Math.random() * -1000) - 1; // Range: -1 to -1000

  // Combine the parts
  const randomNumber = `${timestamp}${randomNegative1}${randomNegative2}`;

  return randomNumber;
}


/**
 * Generate a date in seconds
 * @description This function generates a date in seconds by dividing the current timestamp by 1000.
 * @returns 
 */
export const GenerateDate = () => {
  return Date.now();
}


export const GenerateItemRef = () => {
  const timestamp = Date.now().toString(16); // Convert current timestamp to hexadecimal
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'); // Generate a random 6-character hex
  return `${timestamp}${randomHex}`;
}