/**
 * Formats a phone number string to US format
 * @param phoneNumber - The phone number string to format
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  if (cleanNumber.length === 10) {
    return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
  }
  return phoneNumber; // Return as-is if not 10 digits
}

/**
 * Cleans a phone number for tel: links by removing non-digit characters
 * @param phoneNumber - The phone number string to clean
 * @returns Clean phone number string
 */
export function cleanPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '');
}
