export const getImageSrc = (conditionCode: string, hour: number): string => {
  const isDaytime = hour >= 6 && hour < 18;
  const timeOfDay = isDaytime ? 'day' : 'night';
  return `/${conditionCode}-${timeOfDay}.png`;
};
