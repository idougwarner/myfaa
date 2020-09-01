import formatISO from 'date-fns/formatISO';

export const getDateString = (date) =>
  formatISO(date, { representation: 'date' });
