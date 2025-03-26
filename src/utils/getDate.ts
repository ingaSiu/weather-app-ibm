export const getFormattedDate = (): string => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = today.toLocaleDateString('en-GB', options);
  return formattedDate.replace(' ', ', ');
};

export const getDayOfWeek = (dateString: string): string => {
  const today = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  };
  return today.toLocaleDateString('en-GB', options);
};

export const getShortDate = (dateString: string): string => {
  const today = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('lt-LT', options);
  return formattedDate.replace('/', '–');
};
