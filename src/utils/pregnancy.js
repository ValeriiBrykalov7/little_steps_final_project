import dayjs from 'dayjs';

export const calculateWeek = (dueDate) => {
  if (!dueDate) {
    return 1;
  }
  const today = dayjs().startOf('day');
  const target = dayjs(dueDate).startOf('day');

  const daysToMeet = target.diff(today, 'day');

  const daysPassed = 280 - daysToMeet;
  const currentWeek = Math.ceil(daysPassed / 7);
  return Math.max(1, Math.min(currentWeek, 40));
};
export const calculateDays = (dueDate, currentWeek) => {
  if (dueDate) {
    const diff = dayjs(dueDate).diff(dayjs().startOf('day'), 'day');
    return diff > 0 ? diff : 0;
  }

  const totalDays = 40 * 7;
  const passedDays = currentWeek * 7;
  return totalDays - passedDays;
};

export const calculateDayInWeek = (dueDate) => {
  if (!dueDate) return 0;

  const today = dayjs().startOf('day');
  const target = dayjs(dueDate).startOf('day');

  const daysToMeet = target.diff(today, 'day');
  const daysPassed = 280 - daysToMeet;

  return ((daysPassed % 7) + 7) % 7;
};
