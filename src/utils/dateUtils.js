import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addDays,
  addWeeks,
  addMonths,
  parseISO,
  isValid
} from 'date-fns';

export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  return format(date, formatStr);
};

export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

export const formatDateTime = (date) => {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm');
};

export const parseDateTime = (dateTimeString) => {
  const parsed = parseISO(dateTimeString);
  return isValid(parsed) ? parsed : new Date();
};

export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const isSameMonthAsDate = (date, referenceDate) => {
  return isSameMonth(date, referenceDate);
};

export const generateRecurringDates = (startDate, endDate, recurrence) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = endDate ? new Date(endDate) : addMonths(new Date(startDate), 12); // Default 1 year

  while (currentDate <= end) {
    dates.push(new Date(currentDate));

    switch (recurrence.type) {
      case 'daily':
        currentDate = addDays(currentDate, recurrence.interval || 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, recurrence.interval || 1);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, recurrence.interval || 1);
        break;
      case 'custom':
        currentDate = addDays(currentDate, recurrence.customDays || 1);
        break;
      default:
        return [new Date(startDate)];
    }

    // Prevent infinite loops
    if (dates.length > 365) break;
  }

  return dates;
};