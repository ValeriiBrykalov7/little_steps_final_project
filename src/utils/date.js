export const getDateInFortyWeeks = () => {
  const now = new Date();
  const daysToAdd = 40 * 7;
  now.setDate(now.getDate() + daysToAdd);

  return now.toISOString().slice(0, 10);
};

export const getCurrentDate = () => new Date().toISOString().slice(0, 10);
