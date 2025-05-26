import { isSameDay, parseISO, format } from 'date-fns';
import { generateRecurringDates } from './dateUtils';

export const getEventsForDate = (events, date) => {
  return events.filter(event => {
    if (event.isRecurring && event.recurrenceDates) {
      return event.recurrenceDates.some(recurDate => 
        isSameDay(parseISO(recurDate), date)
      );
    }
    return isSameDay(parseISO(event.date), date);
  });
};

export const hasEventConflict = (events, newEvent, excludeEventId = null) => {
  const newEventDate = parseISO(newEvent.date);
  const newEventTime = newEvent.time;

  return events.some(event => {
    if (excludeEventId && event.id === excludeEventId) return false;
    
    const eventDates = event.isRecurring && event.recurrenceDates 
      ? event.recurrenceDates.map(d => parseISO(d))
      : [parseISO(event.date)];

    return eventDates.some(eventDate => 
      isSameDay(eventDate, newEventDate) && event.time === newEventTime
    );
  });
};

export const processRecurringEvent = (event) => {
  if (!event.isRecurring || event.recurrence.type === 'none') {
    return { ...event, recurrenceDates: null };
  }

  const recurrenceDates = generateRecurringDates(
    parseISO(event.date),
    event.recurrenceEndDate ? parseISO(event.recurrenceEndDate) : null,
    event.recurrence
  );

  return {
    ...event,
    recurrenceDates: recurrenceDates.map(date => format(date, 'yyyy-MM-dd'))
  };
};

export const updateRecurringEventInstance = (event, newDate, updateType = 'single') => {
  if (updateType === 'all') {
    // Update all instances
    return processRecurringEvent({
      ...event,
      date: format(newDate, 'yyyy-MM-dd')
    });
  } else {
    // Create exception for single instance
    const exceptions = event.exceptions || [];
    const originalDate = format(parseISO(event.date), 'yyyy-MM-dd');
    const newDateStr = format(newDate, 'yyyy-MM-dd');

    return {
      ...event,
      exceptions: [...exceptions, {
        originalDate,
        newDate: newDateStr,
        eventData: { ...event, date: newDateStr }
      }]
    };
  }
};