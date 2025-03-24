export function getFormattedDate(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = today.toLocaleDateString('en-GB', options);
  return formattedDate.replace(' ', ', ');
}
