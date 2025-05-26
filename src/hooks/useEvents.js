import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { processRecurringEvent } from '../utils/eventUtils';

export const useEvents = () => {
  const [events, setEvents] = useLocalStorage('calendar-events', []);

  const addEvent = useCallback((eventData) => {
    const newEvent = {
      id: uuidv4(),
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const processedEvent = processRecurringEvent(newEvent);
    setEvents(prev => [...prev, processedEvent]);
    return processedEvent;
  }, [setEvents]);

  const updateEvent = useCallback((eventId, eventData) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const updatedEvent = {
          ...event,
          ...eventData,
          updatedAt: new Date().toISOString()
        };
        return processRecurringEvent(updatedEvent);
      }
      return event;
    }));
  }, [setEvents]);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, [setEvents]);

  const moveEvent = useCallback((eventId, newDate) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const updatedEvent = {
          ...event,
          date: newDate,
          updatedAt: new Date().toISOString()
        };
        return processRecurringEvent(updatedEvent);
      }
      return event;
    }));
  }, [setEvents]);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent
  };
};