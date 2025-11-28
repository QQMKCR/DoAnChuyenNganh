export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  return phoneRegex.test(phone);
};

export const isValidBhytId = (id: string): boolean => {
  const bhytRegex = /^[A-Z]{2}\d{13}$/;
  return bhytRegex.test(id);
};

export const isValidCitizenId = (id: string): boolean => {
  const citizenIdRegex = /^\d{12}$/;
  return citizenIdRegex.test(id);
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};