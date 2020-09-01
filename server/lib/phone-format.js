import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

export const getFormattedPhoneNumber = (cell, country = 'US') => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  try {
    const inputNumber = phoneUtil.parse(cell, country);
    const isValid = phoneUtil.isValidNumber(inputNumber);
    if (isValid) {
      return phoneUtil.format(inputNumber, PhoneNumberFormat.E164);
    }

    return null;
  } catch (e) {
    return null;
  }
};
