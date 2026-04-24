// Функція, що вираховує чи дата НЕ є раніше сьогоднішньої
export const validateNotPastDate = (value, helpers) => {
  const inputDate = new Date(value);

  if (isNaN(inputDate)) {
    return helpers.error('date.base');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return helpers.error('date.min');
  }

  return value;
};
